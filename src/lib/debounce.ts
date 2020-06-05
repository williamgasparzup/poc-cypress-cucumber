export function debounce(fn: Function, delay: number = 300) {
  let timer = 0

  return function <T>(arg: T) {
    clearTimeout(timer)
    timer = window.setTimeout(() => fn(arg), delay)

    return timer
  }
}
