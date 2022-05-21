interface Word {}

export function count_words(words:string[]) {
  return words.reduce(
    (acc, e) => {
      return acc.set(e.toLowerCase(), (acc.get(e.toLowerCase()) || 0) + 1)
    }, new Map()
  )
}