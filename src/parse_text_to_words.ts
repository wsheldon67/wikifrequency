export function parse_text_to_words(text:string):string[] {
  const re_words = /(\w|')+/g
  return text.match(re_words)
}