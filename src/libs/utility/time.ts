export function normalizeNumber (num: number): string {
  return num > 9 ? `${num}` : `0${num}`
}
/*
  时间格式：2019-10-31 10:23:24
*/

export function normalizeTimeDetail (time: string): string {
  let date: Date = new Date(time)
  let year: number = date.getFullYear()
  let month: string = normalizeNumber(date.getMonth() + 1)
  let days: string = normalizeNumber(date.getDate())
  let hour: string = normalizeNumber(date.getHours())
  let minutes: string = normalizeNumber(date.getMinutes())
  let seconds: string = normalizeNumber(date.getSeconds())
  return `${year}-${month}-${days} ${hour}:${minutes}:${seconds}`
}
/*
  时间格式：2019.10.31
*/

export function normalizeTime (time) {
  let date = new Date(time)
  return `${date.getFullYear()}.${normalizeNumber(date.getMonth() + 1)}.${normalizeNumber(date.getDate())}`
}
