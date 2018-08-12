import '../styles/main.css'
import mole from '../images/mole.png'

function rand (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

const state = {
  moles: [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ],
  score: 0,
  time: 0,
  plays: 0
}

const generate = () => {}
setInterval(() => {
  state.moles.map((moleState, idx) => {
    state.moles[idx] = moleState
  })
  render()
}, 3000)

const render = () => {
  state.moles.map((state, idx) => {
    const el = document.querySelector(`.grid__item[data-placement="${idx}"]`)

    if (state === 1) {
      el.classList.add('is-active')
    }
    else {
      el.classList.remove('is-active')
    }
  })

  const scoreEl = document.getElementById('score')
  scoreEl.innerHTML = `Score: ${state.score}`
}

const updateMoles = (moles, idx, state, next) => {
  moles[idx] = state
  render()
}

document.querySelector('.grid')
  .addEventListener('mousedown', e => {
    const isClickable = e.target.classList.contains('grid__item')
    if (!isClickable) return

    const placement = parseInt(e.target.dataset.placement)
    const state = state.moles[placement]
    if (state === 1) {
      state.score++
      updateMoles(state.moles, placement, 0)
    }
    console.table(state.moles)

    e.stopPropagation()
  })


const draw = grid => {
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

const main = () => {
  const grid = document.querySelector('.grid')
  grid.innerHTML = ''
  draw(grid)
}

main()