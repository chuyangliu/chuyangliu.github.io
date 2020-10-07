module.exports = (() => {
  'use strict'

  function Snake(initBodies, initDirec) {
    this._initBodies = initBodies
    this._initDirec = initDirec
    this.reset()
  }

  Snake.prototype.reset = function() {
    this._bodies = []
    for (let i = 0; i < this._initBodies.length; ++i) {
      this._bodies.push(this._initBodies[i].clone())
    }
    this._lastDirec = this._initDirec
  }

  Snake.prototype.lastDirec = function() {
    return this._lastDirec
  }

  Snake.prototype.len = function() {
    return this._bodies.length
  }

  Snake.prototype.head = function() {
    return this.body(0)
  }

  Snake.prototype.tail = function() {
    return this.body(this.len() - 1)
  }

  Snake.prototype.body = function(idx) {
    return this._bodies[idx]
  }

  Snake.prototype.move = function(direc, grow) {
    this._bodies.unshift(this.head().adj(direc))
    if (!grow) this._bodies.pop()
    this._lastDirec = direc
  }

  return Snake
})()
