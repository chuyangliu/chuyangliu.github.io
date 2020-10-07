module.exports = (() => {
  'use strict'

  const NONE = 0
  const LEFT = 1
  const UP = 2
  const RIGHT = 3
  const DOWN = 4

  const isOpposite = (direc1, direc2) =>
    direc1 === _opposite(direc2)

  const _opposite = (direc) => {
    if (direc === LEFT) {
      return RIGHT
    } else if (direc === UP) {
      return DOWN
    } else if (direc === RIGHT) {
      return LEFT
    } else if (direc === DOWN) {
      return UP
    }
    return NONE
  }

  return {
    NONE: NONE,
    LEFT: LEFT,
    UP: UP,
    RIGHT: RIGHT,
    DOWN: DOWN,

    isOpposite: isOpposite
  }
})()
