$(() => {
  'use strict'
  console.log = () => {} // Disable logs
  const game = require('./gamemain.js')
  game.init()
})
