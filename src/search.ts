export interface Page {
  title: string
  extract: string
}

export async function searchWikipedia(title:string):Promise<Page> {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=${title}&explaintext=1&formatversion=2&exsectionformat=plain&format=json&origin=*`
  const response = await fetch(endpoint)
  if (!response.ok) {
    throw Error(response.statusText)
  }
  const json = await response.json()
  const page = json.query.pages[0]
  return page
}