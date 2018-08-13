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
  plays: 0,
  loop: 3000,
  min: 1000
}

// const generate = () => {}
setInterval(() => {
  state.moles.map((moleState, idx) => {
    const newMoleState = rand(0, 1)
    updateMole(state.moles, idx, newMoleState)
    if (newMoleState === 1) {
      setTimeout(() => {
        updateMole(state.moles, idx, 0)
      }, rand(state.min, state.loop))
    }
  })
  render()
}, state.loop)

const render = () => {
  state.moles.map((moleState, idx) => {
    const el = document.querySelector(`.grid__item[data-placement="${idx}"]`)

    if (moleState === 1) {
      el.classList.add('is-active')
    }
    else {
      el.classList.remove('is-active')
    }
  })

  const scoreEl = document.getElementById('score')
  scoreEl.innerHTML = `Score: ${state.score}`
}

const updateMole = (moles, idx, state, next) => {
  moles[idx] = state
  render()
}

document.querySelector('.grid')
  .addEventListener('mousedown', e => {
    const isClickable = e.target.classList.contains('grid__item')
    if (!isClickable) return

    const placement = parseInt(e.target.dataset.placement)
    const moleState = state.moles[placement]
    if (moleState === 1) {
      state.score++
      updateMole(state.moles, placement, 0)
    }

    e.stopPropagation()
  })


const draw = grid => {
  state.moles.map((el, idx) => {
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