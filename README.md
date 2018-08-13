# Whack-a-Mole

Whack-a-Mole game in Vanilla JS

![screenshot](https://user-images.githubusercontent.com/189379/44050585-fa837a68-9efc-11e8-85df-43b281f44636.PNG)

## Install
* clone this repo
* cd to the repo
* `npm run install`
* `npm run serve`
* go to http://localhost:1234

## Features
- 8-bit ui
- Sound effects
- gameplay using Numpad

### Todo (core):
- remove dependency on UI layer when whacking mole (see keypad function)
- try to reduce number of asyncronus intervals
- there is a small width size range that overflows past the bottom of the screen
- add JSDoc style documentation. I've broken down alot of functionality into smaller chunks, named in a way that is (somewhat) self documenting.

### Todo (UI):

- Convert setInterval into requestAnimationFrame for performance
- an admin panel to adjust game variables (for play testing)
- better animations for mole emerging from hole
- use canvas for drawing items
- better display for score and timing (more game like)
