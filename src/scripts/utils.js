const curry = fn => {
  return (...xs) => {
    if (xs.length === 0) {
      throw Error('EMPTY INVOCATION')
    }
    if (xs.length >= fn.length) {
      return fn(...xs);
    }
    return curry(fn.bind(null, ...xs))
  }
}
export const pipe = (...ops) => ops.reduce((a, b) => (arg) => b(a(arg))) 
export const rand = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}
export const $ = query => document.querySelector(query)
export const $$ = query => document.querySelectorAll(query)
export const html = curry((el, data) => {
  el.innerHTML = data
  return el
})
export const getById = query => document.getElementById(query)
export const createEl = curry((tag, content, classes, id) => {
  const el = document.createElement(tag)
  html(el, content)
  classes.map(cl => el.classList.add(cl))
  if (id) el.id = id
  return el
})
export const append = curry((to, el) => {
  to.appendChild(el)
  return el
})
export const prepend = curry((to, el) => {
  to.prepend(el)
  return el
})
export const unload = el => html(el, '')  
export const addEvent = curry((name, fn, el) => {
  el.addEventListener(name, fn)
  return el
})
export const getByPlacement = num => $(`.grid__item[data-placement="${num}"]`)
export const between = curry((min, max, num) => num >= min && num <= max)
export const when = curry((pred, whenTrueFn, x) => pred(x) ? whenTrueFn(x) : x)
export const subtract = curry((a, b) => b - a)
