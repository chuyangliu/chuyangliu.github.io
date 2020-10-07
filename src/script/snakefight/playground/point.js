module.exports = (() => {
  'use strict'

  function Point(type) {
    this._type = type || Point.TYPE.EMPTY
  }

  Point.TYPE = {
    EMPTY: 0,
    WALL: 1,
    FOOD: 2,
    SELF_BODY: 3,
    SELF_HEAD: 4,
    OPPONENT_BODY: 5,
    OPPONENT_HEAD: 6
  }

  Point.prototype.type = function(val) {
    if (val == null) return this._type
    else this._type = val
  }

  return Point
})()
