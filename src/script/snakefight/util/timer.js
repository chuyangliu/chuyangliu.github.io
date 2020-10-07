module.exports = (() => {
  'use strict'

  let countDownTimerId = null
  let element = null
  let oriContent = null

  const startCountDown = (jqObj, beg, end, cb) => {
    stopCountDown()
    element = jqObj
    oriContent = jqObj.html()
    jqObj.html(beg)
    countDownTimerId = window.setInterval(() => {
      --beg
      if (beg === end - 1) {
        stopCountDown()
        if (cb) cb()
      } else {
        jqObj.html(beg)
      }
    }, 1000)
  }

  const stopCountDown = () => {
    if (countDownTimerId) window.clearInterval(countDownTimerId)
    if (element && oriContent) element.html(oriContent)
    countDownTimerId = null
    element = null
    oriContent = null
  }

  return {
    startCountDown: startCountDown,
    stopCountDown: stopCountDown
  }
})()
