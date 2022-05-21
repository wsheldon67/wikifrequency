<script lang="ts">
  import { searchWikipedia } from './search'
  import { parse_text_to_words } from './parse_text_to_words'
  import { count_words } from './count_words'
  import { fake } from "./fake";

  export let title
  export let revealed_list
  $: word_list_promise = get_word_list(title)
  let guess = ''
  let answer_title = ''
  let won = false
  let time_to_guess = false
  $: placeholder = time_to_guess ? 'Make a Guess' : 'Reveal a Word'
  $: disabled = !time_to_guess

  async function get_word_list(article:string):Promise<[string, number][]> {
    console.log('loading', article)
    const page = await searchWikipedia(article)
    answer_title = page.title
    const words = parse_text_to_words(page.extract)
    const word_counts = count_words(words)
    const word_counts_array = [...word_counts.entries()]
    let truncated
    if (word_counts_array.length > 500) {
      truncated = word_counts_array.slice(0, 500)
    } else {
      truncated = word_counts_array
    }
    truncated.sort((a,b) => b[1] - a[1])
    console.log(truncated)
    return truncated
  }
  // TODO loads current day instead of last worked on on refresh

  function reveal(word:string) {
    revealed_list = [...revealed_list, word]
    localStorage.setItem('revealed_list', JSON.stringify(revealed_list))
    time_to_guess = true
  }
  function check_answer() {
    if (guess.toLowerCase() === answer_title.toLowerCase()) {
      announce_win()
    }
    guess = ''
    time_to_guess = false
  }
  function announce_win() {
    won = true
  }

</script>
<form class='guesser' on:submit|preventDefault={check_answer}>
  <input type='text' {placeholder} {disabled} bind:value={guess}/>
  <p>Words Revealed: {revealed_list.length}</p>
</form>
<div class='cont'>
{#await word_list_promise}
  Loading...
{:then word_list} 
  {#each word_list as [word], index}
  <p>{index+1}</p>
  {#if revealed_list.includes(word)}
    <p>{word}</p>
  {:else}
    <button on:click={()=>{reveal(word)}}>
      Reveal
    </button>
  {/if}
  {/each}
{/await}
</div>

{#if won}
<div class='win'>
  <h1>Congratulations!</h1>
  <p><a href={`https://en.wikipedia.org/wiki/${title}`}>{answer_title}</a>
  was the correct answer.</p>
  <p>It took you {revealed_list.length} reveals to get the answer.</p>
  <p><button on:click={()=>{won = false}}>
    Close
  </button></p>
</div>
{/if}