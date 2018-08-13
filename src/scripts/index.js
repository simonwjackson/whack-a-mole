import '../styles/main.css'
import mole from '../images/mole.png'
import { rand, $, byId, html } from './utils'
import state from './state'

const render = () => {
  state.moles.map((moleState, idx) => {
    const el = $(`.grid__item[data-placement="${idx}"]`)
    if (moleState === 1) el.classList.add('is-active')
    else el.classList.remove('is-active')
  })

  html(byId('score'), `Score: ${state.score}`)
  html(byId('time'), `Time: ${state.time / 1000}`)
}

const updateMole = (moles, idx, state) => {
  moles[idx] = state
  render()
}

const gameLoop = () => {
  state.moles.map((moleState, idx) => {
    const newMoleState = rand(0, 1)
    updateMole(state.moles, idx, newMoleState)

    if (newMoleState === 1) {
      setTimeout(() => {
        updateMole(state.moles, idx, 0)
      }, rand(state.settings.timing.min, state.settings.timing.max))
    }
  })

  render()
}

const start = () => {
  const interval = 1000

  gameLoop()
  state.gameTimer = setInterval(() => {
    if (state.time <= interval) {
      state.moles = state.moles.map(() => 0)
      state.time = 0
      clearInterval(state.gameTimer)
    } else {
      state.time -= interval
    }
    render()
  }, interval)

  state.gameInterval = setInterval(() => {
    if (state.time <= 0) {
      clearInterval(state.gameInterval)
      return
    }

    gameLoop()
  }, state.settings.timing.max)
}

const stop = () => {
  clearInterval(state.gameTimer)
  clearInterval(state.gameInterval) 
  render()
}

const reset = () => {
  stop()
  state.time = state.settings.timing.timer
  state.score = 0
  render()
}

const createButtons = () => {
  byId('start').addEventListener('click', start)
  byId('stop').addEventListener('click', stop)
  byId('reset').addEventListener('click', reset) 
}

const setupEvents = () => {
  $('.grid')
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
}

const init = () => {
  createButtons()
  setupEvents()

  const grid = $('.grid')
  html(grid, '')

  state.time = state.settings.timing.timer

  state.moles.map((el, idx) => {
    const img = document.createElement('img')
    img.classList.add('img-responsive')
    img.setAttribute('src', mole)

    const item = document.createElement('div')
    item.classList.add('grid__item')
    item.dataset.placement = idx
    item.appendChild(img)

    grid.appendChild(item)
  })
}

document.addEventListener('DOMContentLoaded', init)