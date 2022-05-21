export const puzzles = [
  'Pet_door', 'Valencia'
]

export function puzzle(day:number):string {
  console.log(day)
  return puzzles[day]
}