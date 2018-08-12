import '../styles/main.css'
import mole from '../images/mole.png'

const moles = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0
]

// document
//   .querySelectorAll('.grid__item')
//   .forEach((node, idx) => {
//     node.dataset.placement = idx
//   })

const updateMoles = (moles, idx, state, next) => {
  moles[idx] = state
}

document.querySelector('.grid')
  .addEventListener('mousedown', e => {
    const isClickable = e.target.classList.contains('grid__item')
    if (!isClickable) return
    const placement = parseInt(e.target.dataset.placement)
    const state = moles[placement] === 1 ? 0 : 1
    updateMoles(moles, placement, state)
    console.table(moles)

    e.stopPropagation()
  })

const grid = document.querySelector('.grid')
grid.innerHTML = ''

const draw = () => {
  moles.map((el, idx) => {
    const img = document.createElement('img')
    img.classList.add('img-responsive')
    img.setAttribute('src', mole )

    const item = document.createElement('div')
    item.classList.add('grid__item')
    item.dataset.placement = idx
    item.appendChild(img)

    grid.appendChild(item)
  })
}

draw()