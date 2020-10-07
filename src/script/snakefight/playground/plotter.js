module.exports = (numRows, numCols) => {
  'use strict'

  // Sizes in pixels - BEGIN

  const CANVAS_WIDTH = Math.floor(0.8 * window.innerWidth)
  const CANVAS_HEIGHT = Math.floor(0.8 * window.innerHeight)

  const SHADOW_SIZE = 15
  const SHADOW_BLUR = SHADOW_SIZE

  const EXPECT_CONTENT_WIDTH = CANVAS_WIDTH - 2 * SHADOW_SIZE
  const EXPECT_CONTENT_HEIGHT = CANVAS_HEIGHT - 2 * SHADOW_SIZE

  const EXPECT_BLOCK_WIDTH = Math.floor(EXPECT_CONTENT_WIDTH / numCols)
  const EXPECT_BLOCK_HEIGHT = Math.floor(EXPECT_CONTENT_HEIGHT / numRows)

  const BLOCK_WIDTH = Math.min(EXPECT_BLOCK_WIDTH, EXPECT_BLOCK_HEIGHT)
  const BLOCK_HEIGHT = BLOCK_WIDTH

  const EXPECT_PAD_HOR = Math.floor(0.5 * (EXPECT_CONTENT_WIDTH - numCols * BLOCK_WIDTH))
  const EXPECT_PAD_VER = Math.floor(0.5 * (EXPECT_CONTENT_HEIGHT - numRows * BLOCK_HEIGHT))

  const PAD_HOR = EXPECT_PAD_HOR + SHADOW_SIZE
  const PAD_VER = EXPECT_PAD_VER + SHADOW_SIZE

  const CONTENT_WIDTH = CANVAS_WIDTH - 2 * PAD_HOR
  const CONTENT_HEIGHT = CANVAS_HEIGHT - 2 * PAD_VER

  const CONTENT_WIDTH_WITH_SHADOW = CANVAS_WIDTH - 2 * EXPECT_PAD_HOR
  const CONTENT_HEIGHT_WITH_SHADOW = CANVAS_HEIGHT - 2 * EXPECT_PAD_VER

  const MARGIN_HOR = 0.5 * (window.innerWidth - CONTENT_WIDTH)
  const MARGIN_VER = 0.5 * (window.innerHeight - CONTENT_HEIGHT)

  const SCALE_FACTOR = 0.2
  const EYE_MARGIN_FACTOR = 1.7

  const DX = BLOCK_WIDTH * SCALE_FACTOR
  const DY = BLOCK_HEIGHT * SCALE_FACTOR

  const R_EYE = 0.3 * (DX + DY)
  const R_EYEBALL = 0.5 * R_EYE

  // Sizes in pixels - END

  const HEAD = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3
  }

  const BODY = {
    HOR: 0,
    VER: 1,
    LU: 2,
    UR: 3,
    RD: 4,
    DL: 5
  }

  const DURATION_SHADOW_BLINK = 250

  let color = null

  let ctxMain = null
  let ctxShadow = null

  let blinkReqId = null

  const actualContentWidth = () => CONTENT_WIDTH

  const actualContentHeight = () => CONTENT_HEIGHT

  const actualMarginHor = () => MARGIN_HOR

  const actualMarginVer = () => MARGIN_VER

  const init = (mainCanvas, colorSet, test) => {
    if (!mainCanvas.get(0).getContext) {
      alert('Sorry! Your browser does not support <canvas>. Please use a different one.')
      throw new Error('[plotter] unsupported canvas')
    }

    color = colorSet

    mainCanvas.attr('width', CANVAS_WIDTH)
    mainCanvas.attr('height', CANVAS_HEIGHT)
    ctxMain = mainCanvas.get(0).getContext('2d')

    const shadowCanvas = mainCanvas.clone()
    shadowCanvas.attr('width', CONTENT_WIDTH_WITH_SHADOW)
    shadowCanvas.attr('height', CONTENT_HEIGHT_WITH_SHADOW)
    shadowCanvas.css('z-index', Number(mainCanvas.css('z-index')) - 1)
    shadowCanvas.insertAfter(mainCanvas)
    ctxShadow = shadowCanvas.get(0).getContext('2d')

    if (test) _drawTestContents()
  }

  const clear = (row, col) => {
    _clearRect(_colToX(col), _rowToY(row), BLOCK_WIDTH, BLOCK_HEIGHT)
  }

  const clearAll = () => {
    _clearRect(PAD_HOR, PAD_VER, CONTENT_WIDTH, CONTENT_HEIGHT)
  }

  const drawFood = (row, col) => {
    _drawFood(row, col, color.FOOD)
  }

  const drawSelfHead = (row, col, type) => {
    drawHead(row, col, type, true)
  }

  const drawSelfBody = (row, col, type) => {
    drawBody(row, col, type, true)
  }

  const drawOpponentHead = (row, col, type) => {
    drawHead(row, col, type, false)
  }

  const drawOpponentBody = (row, col, type) => {
    drawBody(row, col, type, false)
  }

  const drawHead = (row, col, type, self) => {
    _drawHead(row, col, type, self ? color.SELF_HEAD : color.OPPONENT_HEAD)
  }

  const drawBody = (row, col, type, self) => {
    _drawBody(row, col, type, self ? color.SELF_BODY : color.OPPONENT_BODY)
  }

  const drawAttackShadow = () => {
    _stopBlink()
    _drawShadow(color.SHADOW_ATTACK, SHADOW_BLUR)
  }

  const drawDefendShadow = () => {
    _stopBlink()
    _drawShadow(color.SHADOW_DEFEND, SHADOW_BLUR)
  }

  const drawBlinkAttackShadow = () => {
    _stopBlink()
    _drawBlinkShadow(color.SHADOW_ATTACK, 0.25 * SHADOW_BLUR, SHADOW_BLUR, DURATION_SHADOW_BLINK)
  }

  const drawBlinkDefendShadow = () => {
    _stopBlink()
    _drawBlinkShadow(color.SHADOW_DEFEND, 0.25 * SHADOW_BLUR, SHADOW_BLUR, DURATION_SHADOW_BLINK)
  }

  const _drawFood = (row, col, color) => {
    const xBeg = _colToX(col)
    const yBeg = _rowToY(row)
    const xMid = xBeg + 0.5 * BLOCK_WIDTH
    const yMid = yBeg + 0.5 * BLOCK_HEIGHT
    const r = 0.25 * (BLOCK_WIDTH - 1.5 * DX + BLOCK_HEIGHT - 1.5 * DY)

    clear(row, col)
    ctxMain.fillStyle = color
    ctxMain.beginPath()
    ctxMain.arc(xMid, yMid, r, 0, 2 * Math.PI)
    ctxMain.fill()
  }

  const _drawHead = (row, col, type, color) => {
    const xBeg = _colToX(col)
    const yBeg = _rowToY(row)
    const xMid = xBeg + 0.5 * BLOCK_WIDTH
    const yMid = yBeg + 0.5 * BLOCK_HEIGHT
    const xEnd = xBeg + BLOCK_WIDTH
    const yEnd = yBeg + BLOCK_HEIGHT

    clear(row, col)
    ctxMain.fillStyle = color
    if (type === HEAD.LEFT) {
      ctxMain.beginPath()
      ctxMain.moveTo(xEnd, yBeg + DY)
      ctxMain.lineTo(xMid, yBeg + DY)
      ctxMain.bezierCurveTo(xBeg + 0.5 * DX, yBeg + DY, xBeg + 0.5 * DX, yEnd - DY, xMid, yEnd - DY)
      ctxMain.lineTo(xEnd, yEnd - DY)
      ctxMain.fill()
      _drawEyes(xMid, yBeg + EYE_MARGIN_FACTOR * DY, xMid, yEnd - EYE_MARGIN_FACTOR * DY, R_EYE, R_EYEBALL)
    } else if (type === HEAD.UP) {
      ctxMain.beginPath()
      ctxMain.moveTo(xBeg + DX, yEnd)
      ctxMain.lineTo(xBeg + DX, yMid)
      ctxMain.bezierCurveTo(xBeg + DX, yBeg + 0.5 * DY, xEnd - DX, yBeg + 0.5 * DY, xEnd - DX, yMid)
      ctxMain.lineTo(xEnd - DX, yEnd)
      ctxMain.fill()
      _drawEyes(xBeg + EYE_MARGIN_FACTOR * DX, yMid, xEnd - EYE_MARGIN_FACTOR * DX, yMid, R_EYE, R_EYEBALL)
    } else if (type === HEAD.RIGHT) {
      ctxMain.beginPath()
      ctxMain.moveTo(xBeg, yBeg + DY)
      ctxMain.lineTo(xMid, yBeg + DY)
      ctxMain.bezierCurveTo(xEnd - 0.5 * DX, yBeg + DY, xEnd - 0.5 * DX, yEnd - DY, xMid, yEnd - DY)
      ctxMain.lineTo(xBeg, yEnd - DY)
      ctxMain.fill()
      _drawEyes(xMid, yBeg + EYE_MARGIN_FACTOR * DY, xMid, yEnd - EYE_MARGIN_FACTOR * DY, R_EYE, R_EYEBALL)
    } else if (type === HEAD.DOWN) {
      ctxMain.beginPath()
      ctxMain.moveTo(xBeg + DX, yBeg)
      ctxMain.lineTo(xBeg + DX, yMid)
      ctxMain.bezierCurveTo(xBeg + DX, yEnd - 0.5 * DY, xEnd - DX, yEnd - 0.5 * DY, xEnd - DX, yMid)
      ctxMain.lineTo(xEnd - DX, yBeg)
      ctxMain.fill()
      _drawEyes(xBeg + EYE_MARGIN_FACTOR * DX, yMid, xEnd - EYE_MARGIN_FACTOR * DX, yMid, R_EYE, R_EYEBALL)
    }
  }

  const _drawEyes = (xEye1, yEye1, xEye2, yEye2, rEye, rEyeball) => {
    ctxMain.fillStyle = 'white'
    ctxMain.beginPath()
    ctxMain.arc(xEye1, yEye1, rEye, 0, 2 * Math.PI)
    ctxMain.arc(xEye2, yEye2, rEye, 0, 2 * Math.PI)
    ctxMain.fill()

    ctxMain.fillStyle = 'black'
    ctxMain.beginPath()
    ctxMain.arc(xEye1, yEye1, rEyeball, 0, 2 * Math.PI)
    ctxMain.arc(xEye2, yEye2, rEyeball, 0, 2 * Math.PI)
    ctxMain.fill()
  }

  const _drawBody = (row, col, type, color) => {
    const xBeg = _colToX(col)
    const yBeg = _rowToY(row)
    const yEnd = yBeg + BLOCK_HEIGHT - 1
    const verWidth = BLOCK_WIDTH - 2 * DX
    const horHeight = BLOCK_HEIGHT - 2 * DY

    clear(row, col)
    if (type === BODY.HOR) {
      _drawRect(xBeg, yBeg + DY, BLOCK_WIDTH, horHeight, color)
    } else if (type === BODY.VER) {
      _drawRect(xBeg + DX, yBeg, verWidth, BLOCK_HEIGHT, color)
    } else if (type === BODY.LU) {
      _drawRect(xBeg + DX, yBeg, verWidth, DY + 1, color)
      _drawRect(xBeg, yBeg + DY, BLOCK_WIDTH - DX, horHeight, color)
    } else if (type === BODY.UR) {
      _drawRect(xBeg + DX, yBeg, verWidth, DY + 1, color)
      _drawRect(xBeg + DX, yBeg + DY, BLOCK_WIDTH - DX, horHeight, color)
    } else if (type === BODY.RD) {
      _drawRect(xBeg + DX, yEnd - DY, verWidth, DY + 1, color)
      _drawRect(xBeg + DX, yBeg + DY, BLOCK_WIDTH - DX, horHeight, color)
    } else if (type === BODY.DL) {
      _drawRect(xBeg + DX, yEnd - DY, verWidth, DY + 1, color)
      _drawRect(xBeg, yBeg + DY, BLOCK_WIDTH - DX, horHeight, color)
    }
  }

  const _drawRect = (x, y, width, height, color) => {
    ctxMain.fillStyle = color
    ctxMain.fillRect(x, y, width, height)
  }

  const _clearRect = (x, y, width, height) => {
    ctxMain.clearRect(x, y, width, height)
  }

  const _drawBlinkShadow = (color, minBlur, maxBlur, duration) => {
    let lastTime = null
    let ascending = false
    let curBlur = minBlur
    let msDelta = (maxBlur - minBlur) / duration

    const f = (timestamp) => {
      if (!lastTime) lastTime = timestamp

      const blurDelta = (timestamp - lastTime) * msDelta
      if (blurDelta !== 0) {
        if (ascending) {
          curBlur = Math.min(curBlur + blurDelta, maxBlur)
          if (curBlur === maxBlur) ascending = false
        } else {
          curBlur = Math.max(curBlur - blurDelta, minBlur)
          if (curBlur === minBlur) ascending = true
        }
        _drawShadow(color, curBlur)
      }

      lastTime = timestamp
      if (blinkReqId) blinkReqId = window.requestAnimationFrame(f)
    }

    blinkReqId = window.requestAnimationFrame(f)
  }

  const _stopBlink = () => {
    if (blinkReqId) {
      window.cancelAnimationFrame(blinkReqId)
      blinkReqId = null
    }
  }

  const _drawShadow = (color, blur) => {
    ctxShadow.clearRect(0, 0, CONTENT_WIDTH_WITH_SHADOW, CONTENT_HEIGHT_WITH_SHADOW)
    ctxShadow.shadowColor = color
    ctxShadow.shadowBlur = blur
    ctxShadow.fillStyle = 'white'
    ctxShadow.fillRect(SHADOW_SIZE, SHADOW_SIZE, CONTENT_WIDTH, CONTENT_HEIGHT)
  }

  const _colToX = (col) => PAD_HOR + col * BLOCK_WIDTH

  const _rowToY = (row) => PAD_VER + row * BLOCK_HEIGHT

  const _drawTestContents = () => {
    clearAll()

    drawSelfHead(0, 0, HEAD.LEFT)
    drawSelfBody(0, 1, BODY.HOR)
    drawSelfBody(0, 2, BODY.DL)
    drawSelfBody(1, 2, BODY.VER)
    drawSelfBody(2, 2, BODY.LU)
    drawSelfBody(2, 1, BODY.HOR)
    drawSelfBody(2, 0, BODY.UR)
    drawSelfBody(1, 0, BODY.RD)
    drawSelfHead(1, 1, HEAD.RIGHT)

    drawSelfHead(0, 5, HEAD.RIGHT)
    drawSelfBody(0, 4, BODY.HOR)
    drawSelfBody(0, 3, BODY.RD)
    drawSelfBody(1, 3, BODY.VER)
    drawSelfBody(2, 3, BODY.UR)
    drawSelfBody(2, 4, BODY.HOR)
    drawSelfBody(2, 5, BODY.LU)
    drawSelfBody(1, 5, BODY.DL)
    drawSelfHead(1, 4, HEAD.LEFT)

    drawOpponentHead(3, 2, HEAD.UP)
    drawOpponentBody(4, 2, BODY.VER)
    drawOpponentBody(5, 2, BODY.LU)
    drawOpponentBody(5, 1, BODY.HOR)
    drawOpponentBody(5, 0, BODY.UR)
    drawOpponentBody(4, 0, BODY.VER)
    drawOpponentBody(3, 0, BODY.RD)
    drawOpponentBody(3, 1, BODY.DL)
    drawOpponentHead(4, 1, HEAD.DOWN)

    drawOpponentHead(3, 3, HEAD.UP)
    drawOpponentBody(4, 3, BODY.VER)
    drawOpponentBody(5, 3, BODY.UR)
    drawOpponentBody(5, 4, BODY.HOR)
    drawOpponentBody(5, 5, BODY.LU)
    drawOpponentBody(4, 5, BODY.VER)
    drawOpponentBody(3, 5, BODY.DL)
    drawOpponentBody(3, 4, BODY.RD)
    drawOpponentHead(4, 4, HEAD.DOWN)

    clear(1, 1)
    drawFood(1, 1)
    clear(4, 4)
    drawFood(4, 4)
  }

  return {
    HEAD: HEAD,
    BODY: BODY,

    actualContentWidth: actualContentWidth,
    actualContentHeight: actualContentHeight,
    actualMarginHor: actualMarginHor,
    actualMarginVer: actualMarginVer,

    init: init,

    clear: clear,
    clearAll: clearAll,

    drawFood: drawFood,
    drawHead: drawHead,
    drawBody: drawBody,

    drawAttackShadow: drawAttackShadow,
    drawDefendShadow: drawDefendShadow,
    drawBlinkAttackShadow: drawBlinkAttackShadow,
    drawBlinkDefendShadow: drawBlinkDefendShadow,

    drawSelfHead: drawSelfHead,
    drawSelfBody: drawSelfBody,
    drawOpponentHead: drawOpponentHead,
    drawOpponentBody: drawOpponentBody
  }
}
