module.exports = (() => {
  'use strict'

  const DIREC = require('./direc.js')

  function Pos(row, col) {
    this._row = Math.floor(row || 0)
    this._col = Math.floor(col || 0)
  }

  Pos.prototype.row = function(val) {
    if (val == null) return this._row
    else this._row = val
  }

  Pos.prototype.col = function(val) {
    if (val == null) return this._col
    else this._col = val
  }

  Pos.prototype.clone = function() {
    return new Pos(this._row, this._col)
  }

  Pos.prototype.equals = function(other) {
    return this._row === other._row && this._col === other._col
  }

  Pos.prototype.adj = function(direc) {
    if (direc === DIREC.LEFT) {
      return new Pos(this._row, this._col - 1)
    } else if (direc === DIREC.RIGHT) {
      return new Pos(this._row, this._col + 1)
    } else if (direc === DIREC.UP) {
      return new Pos(this._row - 1, this._col)
    } else if (direc === DIREC.DOWN) {
      return new Pos(this._row + 1, this._col)
    }
    return DIREC.NONE
  }

  Pos.prototype.direcTo = function(other) {
    if (this._row === other._row) {
      const diff = this._col - other._col
      if (diff === 1) {
        return DIREC.LEFT
      } else if (diff === -1) {
        return DIREC.RIGHT
      }
    } else if (this._col === other._col) {
      const diff = this._row - other._row
      if (diff === 1) {
        return DIREC.UP
      } else if (diff === -1) {
        return DIREC.DOWN
      }
    }
    return DIREC.NONE
  }

  return Pos
})()
