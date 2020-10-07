module.exports = (() => {
  'use strict'

  const NUM_ROWS = 20
  const NUM_COLS = 35

  const INIT_BODIES_PAD_HOR = 4
  const INIT_BODIES_PAD_VER = 3

  const DURATION_TIME_BLINK = 200

  const plotter = require('./plotter.js')(NUM_ROWS, NUM_COLS)
  const Direc = require('./direc.js')
  const Pos = require('./pos.js')
  const Point = require('./point.js')
  const Snake = require('./snake.js')

  const MAP_DIREC_PLOT_TYPES = {}
  MAP_DIREC_PLOT_TYPES[Direc.LEFT] = plotter.HEAD.LEFT
  MAP_DIREC_PLOT_TYPES[Direc.UP] = plotter.HEAD.UP
  MAP_DIREC_PLOT_TYPES[Direc.RIGHT] = plotter.HEAD.RIGHT
  MAP_DIREC_PLOT_TYPES[Direc.DOWN] = plotter.HEAD.DOWN

  const SNAKE_LEFT = new Snake([
    new Pos(INIT_BODIES_PAD_VER, INIT_BODIES_PAD_HOR + 2),
    new Pos(INIT_BODIES_PAD_VER, INIT_BODIES_PAD_HOR + 1),
    new Pos(INIT_BODIES_PAD_VER, INIT_BODIES_PAD_HOR)
  ], Direc.RIGHT)

  const SNAKE_LEFT_BODY_PLOT_TYPES = [
    plotter.HEAD.RIGHT,
    plotter.BODY.HOR,
    plotter.BODY.HOR
  ]

  const SNAKE_RIGHT = new Snake([
    new Pos(NUM_ROWS - 1 - INIT_BODIES_PAD_VER, NUM_COLS - 1 - INIT_BODIES_PAD_HOR - 2),
    new Pos(NUM_ROWS - 1 - INIT_BODIES_PAD_VER, NUM_COLS - 1 - INIT_BODIES_PAD_HOR - 1),
    new Pos(NUM_ROWS - 1 - INIT_BODIES_PAD_VER, NUM_COLS - 1 - INIT_BODIES_PAD_HOR)
  ], Direc.LEFT)

  const SNAKE_RIGHT_BODY_PLOT_TYPES = [
    plotter.HEAD.LEFT,
    plotter.BODY.HOR,
    plotter.BODY.HOR
  ]

  const COLOR = {
    FOOD: '#81C784',
    SELF_HEAD: '#F44336',
    SELF_BODY: '#F44336',
    OPPONENT_HEAD: '#3F51B5',
    OPPONENT_BODY: '#3F51B5',
    SHADOW_ATTACK: '#F44336',
    SHADOW_DEFEND: '#3F51B5'
  }

  const contents = new Array(NUM_ROWS)

  let canvasContainer = null
  let timeTxt = null

  let snakeSelf = null
  let snakeOpponent = null

  let timeBlinkId = null

  const isValid = (pos) =>
    pos.row() >= 0 && pos.row() < NUM_ROWS && pos.col() >= 0 && pos.col() < NUM_COLS

  const isEmpty = (pos) => isEmptyType(_point(pos).type())

  const isEmptyType = (type) => type === Point.TYPE.EMPTY

  const isWall = (pos) => isWallType(_point(pos).type())

  const isWallType = (type) => type === Point.TYPE.WALL

  const isFood = (pos) => isFoodType(_point(pos).type())

  const isFoodType = (type) => type === Point.TYPE.FOOD

  const isSelf = (pos) => isSelfType(_point(pos).type())

  const isSelfType = (type) =>
    type === Point.TYPE.SELF_HEAD || type === Point.TYPE.SELF_BODY

  const isOpponent = (pos) => isOpponentType(_point(pos).type())

  const isOpponentType = (type) =>
    type === Point.TYPE.OPPONENT_HEAD || type === Point.TYPE.OPPONENT_BODY

  const isSafe = (pos) => isSafeType(_point(pos).type())

  const isSafeType = (type) => isEmptyType(type) || isFoodType(type)

  const lastSelfDirec = () => snakeSelf.lastDirec()

  const selfSnake = () => snakeSelf

  const opponentSnake = () => snakeOpponent

  const init = (canvas, pTime) => {
    plotter.init(canvas, COLOR)
    canvasContainer = canvas.parent()

    timeTxt = pTime
    timeTxt.css('top', plotter.actualMarginVer() + 0.025 * plotter.actualContentHeight())

    for (let i = 0; i < contents.length; ++i) {
      contents[i] = new Array(NUM_COLS)
      for (let j = 0; j < contents[i].length; ++j) {
        contents[i][j] = new Point()
      }
    }
  }

  const resetSnakes = (selfOnLeft) => {
    if (selfOnLeft) {
      snakeSelf = SNAKE_LEFT
      snakeOpponent = SNAKE_RIGHT
    } else {
      snakeSelf = SNAKE_RIGHT
      snakeOpponent = SNAKE_LEFT
    }
    snakeSelf.reset()
    snakeOpponent.reset()

    _clearAll()
    _addSelfSnake(selfOnLeft ? SNAKE_LEFT_BODY_PLOT_TYPES : SNAKE_RIGHT_BODY_PLOT_TYPES)
    _addOpponentSnake(selfOnLeft ? SNAKE_RIGHT_BODY_PLOT_TYPES : SNAKE_LEFT_BODY_PLOT_TYPES)
  }

  const attackShadow = () => {
    plotter.drawAttackShadow()
  }

  const defendShadow = () => {
    plotter.drawDefendShadow()
  }

  const blinkAttackShadow = () => {
    plotter.drawBlinkAttackShadow()
  }

  const blinkDefendShadow = () => {
    plotter.drawBlinkDefendShadow()
  }

  const show = (duration, complete) => {
    canvasContainer.fadeIn(duration, complete)
  }

  const hide = (duration, complete) => {
    canvasContainer.fadeOut(duration, complete)
  }

  const blur = () => {
    canvasContainer.addClass('blur')
  }

  const noBlur = () => {
    canvasContainer.removeClass('blur')
  }

  const showTime = (duration, complete) => {
    timeTxt.fadeIn(duration, complete)
  }

  const hideTime = (duration, complete) => {
    timeTxt.fadeOut(duration, complete)
  }

  const updateTime = (txt) => {
    timeTxt.html(txt)
  }

  const attackTime = () => {
    timeTxt.css('color', COLOR.SELF_BODY)
  }

  const defendTime = () => {
    timeTxt.css('color', COLOR.OPPONENT_BODY)
  }

  const startBlinkTime = () => {
    timeBlinkId = window.setInterval(() => {
      timeTxt.toggle()
    }, DURATION_TIME_BLINK)
  }

  const stopBlinkTime = () => {
    if (timeBlinkId) {
      window.clearInterval(timeBlinkId)
      timeBlinkId = null
    }
  }

  const addRandFood = (random) => {
    const empties = []
    for (let i = 0; i < NUM_ROWS; ++i) {
      for (let j = 0; j < NUM_COLS; ++j) {
        if (isEmptyType(contents[i][j].type())) empties.push(new Pos(i, j))
      }
    }
    if (empties.length > 0) {
      const foodIdx = Math.floor(random() * empties.length)
      _updateFood(empties[foodIdx])
    }
  }

  const moveSelfSnake = (direc) => {
    return _moveSnake(true, direc)
  }

  const moveOpponentSnake = (direc) => {
    return _moveSnake(false, direc)
  }

  const _addSelfSnake = (bodyPlotTypes) => {
    _addSnake(true, bodyPlotTypes)
  }

  const _addOpponentSnake = (bodyPlotTypes) => {
    _addSnake(false, bodyPlotTypes)
  }

  const _addSnake = (self, bodyPlotTypes) => {
    const snake = self ? snakeSelf : snakeOpponent
    for (let i = 0; i < snake.len(); ++i) {
      const body = snake.body(i)
      if (i === 0) {
        _updateHead(body, bodyPlotTypes[i], self)
      } else {
        _updateBody(body, bodyPlotTypes[i], self)
      }
    }
  }

  const _moveSnake = (self, direc) => {
    const snake = self ? snakeSelf : snakeOpponent
    const oldHead = snake.head()
    const oldTail = snake.tail()
    const lastDirec = snake.lastDirec()

    // Disable move backwards
    if (Direc.isOpposite(direc, lastDirec)) {
      direc = lastDirec
    }

    const newHead = oldHead.adj(direc)
    const eatType = isValid(newHead) ? _point(newHead).type() : Point.TYPE.WALL
    const foodEaten = isFoodType(eatType)

    let oldHeadPlotType = null
    if ((lastDirec === Direc.LEFT && direc === Direc.LEFT) ||
        (lastDirec === Direc.RIGHT && direc === Direc.RIGHT)) {
      oldHeadPlotType = plotter.BODY.HOR
    } else if ((lastDirec === Direc.UP && direc === Direc.UP) ||
               (lastDirec === Direc.DOWN && direc === Direc.DOWN)) {
      oldHeadPlotType = plotter.BODY.VER
    } else if ((lastDirec === Direc.RIGHT && direc === Direc.UP) ||
               (lastDirec === Direc.DOWN && direc === Direc.LEFT)) {
      oldHeadPlotType = plotter.BODY.LU
    } else if ((lastDirec === Direc.LEFT && direc === Direc.UP) ||
               (lastDirec === Direc.DOWN && direc === Direc.RIGHT)) {
      oldHeadPlotType = plotter.BODY.UR
    } else if ((lastDirec === Direc.LEFT && direc === Direc.DOWN) ||
               (lastDirec === Direc.UP && direc === Direc.RIGHT)) {
      oldHeadPlotType = plotter.BODY.RD
    } else if ((lastDirec === Direc.RIGHT && direc === Direc.DOWN) ||
               (lastDirec === Direc.UP && direc === Direc.LEFT)) {
      oldHeadPlotType = plotter.BODY.DL
    }

    if (!isWallType(eatType)) _updateHead(newHead, MAP_DIREC_PLOT_TYPES[direc], self)
    _updateBody(oldHead, oldHeadPlotType, self)

    if (!foodEaten && !isSelfType(eatType)) _clear(oldTail)

    snake.move(direc, foodEaten)

    return eatType
  }

  const _updateFood = (pos) => {
    plotter.drawFood(pos.row(), pos.col())
    _point(pos).type(Point.TYPE.FOOD)
  }

  const _updateHead = (pos, plotType, self) => {
    plotter.drawHead(pos.row(), pos.col(), plotType, self)
    _point(pos).type(self ? Point.TYPE.SELF_HEAD : Point.TYPE.OPPONENT_HEAD)
  }

  const _updateBody = (pos, plotType, self) => {
    plotter.drawBody(pos.row(), pos.col(), plotType, self)
    _point(pos).type(self ? Point.TYPE.SELF_BODY : Point.TYPE.OPPONENT_BODY)
  }

  const _clear = (pos) => {
    plotter.clear(pos.row(), pos.col())
    _point(pos).type(Point.TYPE.EMPTY)
  }

  const _clearAll = () => {
    plotter.clearAll()
    for (let i = 0; i < NUM_ROWS; ++i) {
      for (let j = 0; j < NUM_COLS; ++j) {
        contents[i][j].type(Point.TYPE.EMPTY)
      }
    }
  }

  const _point = (pos) => contents[pos.row()][pos.col()]

  return {
    NUM_ROWS: NUM_ROWS,
    NUM_COLS: NUM_COLS,
    Direc: Direc,

    isValid: isValid,
    isEmpty: isEmpty,
    isEmptyType: isEmptyType,
    isWall: isWall,
    isWallType: isWallType,
    isFood: isFood,
    isFoodType: isFoodType,
    isSelf: isSelf,
    isSelfType: isSelfType,
    isOpponent: isOpponent,
    isOpponentType: isOpponentType,
    isSafe: isSafe,
    isSafeType: isSafeType,

    lastSelfDirec: lastSelfDirec,

    selfSnake: selfSnake,
    opponentSnake: opponentSnake,

    init: init,
    resetSnakes: resetSnakes,

    attackShadow: attackShadow,
    defendShadow: defendShadow,
    blinkAttackShadow: blinkAttackShadow,
    blinkDefendShadow: blinkDefendShadow,

    show: show,
    hide: hide,
    blur: blur,
    noBlur: noBlur,

    showTime: showTime,
    hideTime: hideTime,
    updateTime: updateTime,
    attackTime: attackTime,
    defendTime: defendTime,
    startBlinkTime: startBlinkTime,
    stopBlinkTime: stopBlinkTime,

    addRandFood: addRandFood,

    moveSelfSnake: moveSelfSnake,
    moveOpponentSnake: moveOpponentSnake
  }
})()
