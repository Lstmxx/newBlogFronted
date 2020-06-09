let timer
let cb = null
function scrollListen (event) {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    cb(event)
    clearTimeout(timer)
  }, 300)
}

export function handleScroll (name, callback) {
  if (typeof callback !== 'function') {
    return
  }
  cb = callback
  const container = document.getElementById(name)
  container.addEventListener('scroll', scrollListen, true)
}
