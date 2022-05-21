<script lang='ts'>
import Puzzle from "./Puzzle.svelte"
import { puzzle, puzzles } from './puzzles'

  let show_puzzle_picker = false
  const first_date = new Date('2022-05-19')
  const todays_puzzle = Math.floor((new Date().getTime() - first_date.getTime()) / (1000*60*60*24))

  let title = localStorage.getItem('puzzle_title') || puzzle(todays_puzzle)
  let revealed_list = JSON.parse(localStorage.getItem('revealed_list')) || []
  let available_puzzles = puzzles.slice(0, todays_puzzle+1)

function change_puzzle(puzzle_title:string) {
  localStorage.setItem('puzzle_title', puzzle_title)
  localStorage.removeItem('revealed_list')
  title = puzzle_title
  revealed_list = []
  show_puzzle_picker = false
}
//FIXME on reload, turn is 'reveal a word', even if it should be 'make a guess'
</script>
{#if show_puzzle_picker}
{#each available_puzzles as puzzle_title, index}
<button on:click={()=>{change_puzzle(available_puzzles[available_puzzles.length - index - 1])}}>
  {available_puzzles.length - index}
</button>
{/each}
{:else}
  <button on:click={()=>{show_puzzle_picker = true}}>Change Puzzle</button>
  <Puzzle {title} {revealed_list} />
{/if}