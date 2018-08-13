import '../styles/main.css'
import mole from '../images/mole.png'
import {
  rand,
  $,
  getById,
  html,
  unload,
  createEl,
  prepend,
  pipe,
  addEvent,
  getByPlacement,
  when,
  between,
  subtract } from './utils'
import state from './state'

const render = () => {
  state.moles.map((moleState, idx) => {
    const el = getByPlacement(idx)
    if (moleState === 1) el.classList.add('is-active')
    else el.classList.remove('is-active')
  })

  html(getById('score'), `Score: ${state.score}`)
  html(getById('time'), `Time: ${state.time / 1000}`)
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
  const app = $('.top')

  const resetBtn = createEl('button', 'Reset', ['button', 'button--reset'], 'reset')
  addEvent('click', reset, resetBtn)
  prepend(app, resetBtn)

  const stopBtn = createEl('button', 'Stop', ['button', 'button--stop'], 'stop')
  addEvent('click', stop, stopBtn)
  prepend(app, stopBtn)

  const startBtn = createEl('button', 'Start', ['button'], 'start')
  addEvent('click', start, startBtn)
  prepend(app, startBtn)
}

const whack = el => {
  const isClickable = el.classList.contains('grid__item')
  if (!isClickable) return

  const placement = parseInt(el.dataset.placement)
  const moleState = state.moles[placement]

  if (moleState === 1) {
    const sfx = $('#whack')
    sfx.currentTime = 0 
    sfx.play()
    state.score++
    updateMole(state.moles, placement, 0)
  }
}

const setupEvents = () => {
  $('.grid')
    .addEventListener('mousedown', e => {
      whack(e.target)
      e.stopPropagation()
    })
}

const numPadToGridPlacement = num => {
  if (num <= 3) return num + 6
  else if (num > 6) return num - 6
  return num
}

const numpadInput = () => {
  const numWhack = pipe(parseInt, numPadToGridPlacement, subtract(1), getByPlacement, whack)
  const tryWhack = when(between(1, 9), numWhack)
  document.addEventListener('keypress', e => tryWhack(e.key))
}

const init = () => {
  createButtons()
  setupEvents()
  numpadInput()

  const grid = $('.grid')
  unload(grid)

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

  render()
}

addEvent('DOMContentLoaded', init, document)