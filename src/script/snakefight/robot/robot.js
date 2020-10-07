module.exports = (() => {
  'use strict'

  const FREQ_ACTION = 120 // ms
  const CLOSE_DIST = 10

  const Pos = require('../playground/pos.js')

  let gameCtrl = null
  let playground = null

  let direcs = null
  let actions = null
  let cornerPos = null

  let loopId = null
  let searchTbl = null

  const init = (ctrl, plygrnd) => {
    gameCtrl = ctrl
    playground = plygrnd

    direcs = [playground.Direc.LEFT, playground.Direc.UP,
      playground.Direc.RIGHT, playground.Direc.DOWN]

    actions = {}
    actions[direcs[0]] = gameCtrl.ACTION.LEFT
    actions[direcs[1]] = gameCtrl.ACTION.UP
    actions[direcs[2]] = gameCtrl.ACTION.RIGHT
    actions[direcs[3]] = gameCtrl.ACTION.DOWN

    cornerPos = [new Pos(0, 0), new Pos(0, playground.NUM_COLS - 1),
      new Pos(playground.NUM_ROWS - 1, 0),
      new Pos(playground.NUM_ROWS - 1, playground.NUM_COLS - 1)]

    searchTbl = new Array(playground.NUM_ROWS)
    for (let i = 0; i < playground.NUM_ROWS; ++i) {
      searchTbl[i] = new Array(playground.NUM_COLS)
    }
    _resetSearchTbl()
  }

  const fakeBattleId = () => {
    return 'robotbattle'
  }

  const fakeSeed = () => {
    return Math.floor(Math.random() * Math.floor(1e7))
  }

  const fakeAttack = () => {
    return Math.random() < 0.5 ? '0' : '1'
  }

  const start = (cb) => {
    loopId = window.setInterval(() => {
      if (gameCtrl.isGameStarted()) {
        const humanAction = gameCtrl.getNextAction()
        if (humanAction) {
          cb(humanAction, _nextAction())
        }
      }
    }, FREQ_ACTION)
  }

  const stop = () => {
    if (loopId) {
      window.clearInterval(loopId)
      loopId = null
    }
  }

  const _nextAction = () => {
    const robotSnake = playground.opponentSnake()
    const humanSnake = playground.selfSnake()
    const robotHead = robotSnake.head()
    const humanHead = humanSnake.head()

    let dst = null

    if (gameCtrl.isDefending()) {
      dst = humanSnake.body(Math.floor(Math.random() * humanSnake.len()))
    } else {
      if (robotHead.row() < humanHead.row()) {
        if (robotHead.col() < humanHead.col()) {
          if (_isClose(robotHead, humanHead)) {
            dst = _isClose(robotHead, cornerPos[0]) ? cornerPos[1] : cornerPos[0]
          } else {
            dst = robotHead.equals(cornerPos[0]) ? cornerPos[1] : cornerPos[0]
          }
        } else {
          if (_isClose(robotHead, humanHead)) {
            dst = _isClose(robotHead, cornerPos[1]) ? cornerPos[0] : cornerPos[1]
          } else {
            dst = robotHead.equals(cornerPos[1]) ? cornerPos[0] : cornerPos[1]
          }
        }
      } else {
        if (robotHead.col() < humanHead.col()) {
          if (_isClose(robotHead, humanHead)) {
            dst = _isClose(robotHead, cornerPos[2]) ? cornerPos[3] : cornerPos[2]
          } else {
            dst = robotHead.equals(cornerPos[2]) ? cornerPos[3] : cornerPos[2]
          }
        } else {
          if (_isClose(robotHead, humanHead)) {
            dst = _isClose(robotHead, cornerPos[3]) ? cornerPos[2] : cornerPos[3]
          } else {
            dst = robotHead.equals(cornerPos[3]) ? cornerPos[2] : cornerPos[3]
          }
        }
      }
    }

    const path = _smartPath(robotHead, dst, robotSnake.lastDirec())
    return actions[path[0]]
  }

  const _smartPath = (src, dst, bakDirec) => {
    let path = _shortestPath(src, dst, _filterWithoutFood)
    if (path.length === 0) {
      path = _shortestPath(src, dst, _filterWithFood)
      if (path.length === 0) {
        path = [bakDirec]
      }
    }
    return path
  }

  const _filterWithFood = (pos) =>
    playground.isValid(pos) && (playground.isSelf(pos) || playground.isSafe(pos))

  const _filterWithoutFood = (pos) =>
    playground.isValid(pos) && (playground.isSelf(pos) || playground.isEmpty(pos))

  const _shortestPath = (src, dst, posFilter) => {
    _resetSearchTbl()
    searchTbl[src.row()][src.col()].g = 0
    searchTbl[src.row()][src.col()].h = 0

    while (true) {
      const cur = _minNotVisitedPos()

      if (!cur) {
        return []
      }
      if (cur.equals(dst)) {
        return _buildPath(src, dst)
      }

      const curTblCell = searchTbl[cur.row()][cur.col()]
      curTblCell.visited = true

      for (let i = 0; i < direcs.length; ++i) {
        const adj = cur.adj(direcs[i])
        if (posFilter(adj)) {
          const adjTblCell = searchTbl[adj.row()][adj.col()]
          if (!adjTblCell.visited) {
            const tmpG = curTblCell.g + 1
            if (tmpG < adjTblCell.g) {
              adjTblCell.g = tmpG
              adjTblCell.h = _dist(adj, dst)
              adjTblCell.prev = cur
            }
          }
        }
      }
    }
  }

  const _resetSearchTbl = () => {
    for (let i = 0; i < playground.NUM_ROWS; ++i) {
      for (let j = 0; j < playground.NUM_COLS; ++j) {
        searchTbl[i][j] = {
          visited: false,
          g: Infinity,
          h: Infinity,
          prev: null
        }
      }
    }
  }

  const _minNotVisitedPos = () => {
    const pos = new Pos()
    let min = Infinity
    for (let i = 0; i < playground.NUM_ROWS; ++i) {
      for (let j = 0; j < playground.NUM_COLS; ++j) {
        const tblCell = searchTbl[i][j]
        if (!tblCell.visited) {
          const dist = tblCell.g + tblCell.h
          if (dist < min) {
            min = dist
            pos.row(i)
            pos.col(j)
          }
        }
      }
    }
    return min === Infinity ? null : pos
  }

  const _buildPath = (src, dst) => {
    const path = []
    let cur = dst
    while (true) {
      const prev = searchTbl[cur.row()][cur.col()].prev
      if (!prev) break
      path.unshift(prev.direcTo(cur))
      cur = prev
    }
    return path
  }

  const _isClose = (p1, p2) => {
    return _dist(p1, p2) < CLOSE_DIST
  }

  const _dist = (p1, p2) => {
    return Math.abs(p1.row() - p2.row()) + Math.abs(p1.col() - p2.col())
  }

  return {
    init: init,
    fakeBattleId: fakeBattleId,
    fakeSeed: fakeSeed,
    fakeAttack: fakeAttack,
    start: start,
    stop: stop
  }
})()
