export const rand = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}
export const $ = query => document.querySelector(query)
export const $$ = query => document.querySelectorAll(query)
export const byId = query => document.getElementById(query)
export const html = (el, data) => el.innerHTML = data
export const unload = el => html(el, '')
