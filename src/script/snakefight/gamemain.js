module.exports = (() => {
  'use strict'

  const INFO_ERR_CONNECT = 'Failed to connect server. Please try again.'
  const INFO_ERR_SERVER = 'Server error. Please try again.'
  const INFO_ERR_STATE = 'Invalid state. Please try again.'
  const INFO_ERR_ID = 'Invalid battle/player ID. Please try again.'

  const INFO_MAIN_START = 'START'
  const INFO_MAIN_READY = 'READY'

  const INFO_START_ATTACK = 'ATTACK !!!'
  const INFO_START_DEFEND = 'DEFEND !!!'

  const INFO_PREPARE_ATTACK = 'Prepare to ATTACK !!!'
  const INFO_PREPARE_DEFEND = 'Prepare to DEFEND !!!'

  const INFO_WELCOME = 'Welcome! Press START to begin.'
  const INFO_WAIT_BTL = 'Waiting for battle...'
  const INFO_WAIT_READY = 'Waiting opponent ready...'
  const INFO_WAIT_ROBOT_READY = 'Waiting robot ready...'
  const INFO_ROBOT_FOUND = 'Opponent not found. Press READY to play with a robot.'
  const INFO_OPPONENT_FOUND = 'Opponent found. Press READY to continue.'
  const INFO_OPPONENT_NO_RESPONSE = 'Opponent no response. Please find another battle.'
  const INFO_OPPONENT_QUIT = 'Opponent quit. Please find another battle.'
  const INFO_WIN = 'Cheers! You win! Press READY to restart.'
  const INFO_LOST = 'Oops! You lose! Press READY to restart.'

  // seconds
  const TIME_WAIT = 6
  const TIME_READY = 6
  const TIME_AUTO_QUIT = 60

  // milliseconds
  const DURATION_NORMAL = 500
  const DURATION_SWITCH_INFO = 2000
  const DURATION_PREPARE_SWITCH_INFO = 2000

  const FACTOR_STEP_TO_TIME = 0.2

  const timer = require('./util/timer.js')
  const playground = require('./playground/playground.js')
  const robot = require('./robot/robot.js')
  const gameCtrl = require('./gamectrl.js')(robot)

  const MAP_KEY_ACTION = {
    37: gameCtrl.ACTION.LEFT,
    38: gameCtrl.ACTION.UP,
    39: gameCtrl.ACTION.RIGHT,
    40: gameCtrl.ACTION.DOWN
  }

  const MAP_ACTION_DIREC = {}
  MAP_ACTION_DIREC[gameCtrl.ACTION.LEFT] = playground.Direc.LEFT
  MAP_ACTION_DIREC[gameCtrl.ACTION.UP] = playground.Direc.UP
  MAP_ACTION_DIREC[gameCtrl.ACTION.RIGHT] = playground.Direc.RIGHT
  MAP_ACTION_DIREC[gameCtrl.ACTION.DOWN] = playground.Direc.DOWN

  const btnMain = $('button#btn-main')
  const btnQuit = $('button#btn-quit')
  const pInfo = $('p#p-info')
  const modalHelp = $('div#modal-help')

  let autoQuitId = null

  const init = () => {
    _initGlobal()
    _initPlayground()
    _initRobot()
    _initInfo()
    _initMainBtn()
    _initQuitBtn()
    _initHelpBtn()
    _initGameEvents()
    _resetToWait()
  }

  const _initGlobal = () => {
    $(window).on('beforeunload', () => {
      gameCtrl.quit()
    })

    $(document).keydown((event) => {
      if (!gameCtrl.isPlaying()) return

      const action = MAP_KEY_ACTION[event.which]
      if (!action) return

      const direc = MAP_ACTION_DIREC[action]
      const lastDirec = playground.lastSelfDirec()
      if (playground.Direc.isOpposite(direc, lastDirec)) return

      gameCtrl.setNextAction(action)
      if (gameCtrl.isGameStarted()) gameCtrl.action()
    })

    // Init bootstrap tooltips
    $('[data-toggle="tooltip"]').tooltip()
  }

  const _initPlayground = () => {
    playground.init($('div#div-playground canvas'), $('p#p-time'))
  }

  const _initRobot = () => {
    robot.init(gameCtrl, playground)
  }

  const _initInfo = () => {
    _updateInfo(INFO_WELCOME)
  }

  const _initMainBtn = () => {
    btnMain.click(() => {
      _disableMain()
      if (gameCtrl.isOffline()) {
        _updateAndShowInfo(INFO_WAIT_BTL, () => {
          _showQuit()
          _findOpponent()
        })
      } else if (gameCtrl.isNotReady()) {
        _updateAndShowInfo(
          gameCtrl.isUseRobot() ? INFO_WAIT_ROBOT_READY : INFO_WAIT_READY,
          () => {
            _showQuit()
            _ready()
          }
        )
      }
    })
  }

  const _initQuitBtn = () => {
    btnQuit.click(() => {
      if (!gameCtrl.isOffline()) {
        gameCtrl.quit()
        _resetToWait()
        _updateAndShowInfo(INFO_WELCOME)
      }
    })
  }

  const _initHelpBtn = () => {
    $('button#btn-help').click(() => {
      modalHelp.modal()
    })
  }

  const _initGameEvents = () => {
    gameCtrl.setOnDataReceived(_handleData)
    gameCtrl.setOnTakingActions(_cbTakingActions)
    gameCtrl.setOnCreatingFood(_cbCreatingFood)
    gameCtrl.setOnSwitchingRole(_cbSwitchingRole)
    gameCtrl.setOnAboutToSwitch(_cbAboutToSwitch)
    gameCtrl.setOnActionsFinished(_cbActionsFinished)
  }

  const _findOpponent = () => {
    timer.startCountDown(btnMain, TIME_WAIT - 1, 0, () => {
      if (gameCtrl.isWaiting()) {
        gameCtrl.quit()
        _playWithRobot()
      }
    })

    gameCtrl.genPlayerId()

    if (gameCtrl.isConnected()) {
      gameCtrl.wait()
    } else {
      gameCtrl.connect(gameCtrl.wait,
        () => {
          _resetToWait()
          _updateAndShowInfo(INFO_ERR_CONNECT)
        }
      )
    }
  }

  const _ready = () => {
    _stopAutoQuit()
    timer.startCountDown(btnMain, TIME_READY - 1, 0, () => {
      if (gameCtrl.isReady()) {
        gameCtrl.quit()
        _resetToWait()
        _updateAndShowInfo(INFO_OPPONENT_NO_RESPONSE)
      }
    })
    gameCtrl.ready()
  }

  const _cbTakingActions = (selfAction, opponentAction) => {
    let gameover = false
    let win = false
    let eatType = null

    if (gameCtrl.isAttacking()) {
      // Move self first
      eatType = playground.moveSelfSnake(MAP_ACTION_DIREC[selfAction])
      if (!playground.isSafeType(eatType)) {
        win = playground.isOpponentType(eatType)
        gameover = true
      } else {
        // Move opponent then
        eatType = playground.moveOpponentSnake(MAP_ACTION_DIREC[opponentAction])
        if (!playground.isSafeType(eatType)) {
          win = true
          gameover = true
        }
      }
    } else if (gameCtrl.isDefending()) {
      // Move opponent first
      eatType = playground.moveOpponentSnake(MAP_ACTION_DIREC[opponentAction])
      if (!playground.isSafeType(eatType)) {
        win = !playground.isSelfType(eatType)
        gameover = true
      } else {
        // Move self then
        eatType = playground.moveSelfSnake(MAP_ACTION_DIREC[selfAction])
        if (!playground.isSafeType(eatType)) {
          win = false
          gameover = true
        }
      }
    }

    if (gameover) {
      _blurPlayground()
      _normalPlayground()
      gameCtrl.done()
      _resetToReady()
      _updateAndShowInfo(win ? INFO_WIN : INFO_LOST)
    }
  }

  const _cbCreatingFood = () => {
    playground.addRandFood(gameCtrl.getRandGenerator())
  }

  const _cbSwitchingRole = () => {
    _updateAndShowInfo(_getStartInfo())
    _normalPlayground()
    window.setTimeout(() => {
      if (gameCtrl.isPlaying()) _hideInfo()
    }, DURATION_SWITCH_INFO)
  }

  const _cbAboutToSwitch = () => {
    _blinkPlayground()
    _updateAndShowInfo(_getPrepareInfo())
    window.setTimeout(() => {
      if (gameCtrl.isPlaying()) _hideInfo()
    }, DURATION_PREPARE_SWITCH_INFO)
  }

  const _cbActionsFinished = () => {
    _updateTime()
  }

  const _handleData = (type, data1, data2) => {
    timer.stopCountDown()
    if (type === gameCtrl.MSG.ERR) {
      _handleErr(data1)
    } else if (type === gameCtrl.MSG.BID) {
      _handleNewBattle(data1)
    } else if (type === gameCtrl.MSG.START) {
      _handleStart()
    }
  }

  const _handleErr = (errCode) => {
    gameCtrl.quit()
    _resetToWait()
    if (errCode === gameCtrl.ERR.SERVER) {
      _updateAndShowInfo(INFO_ERR_SERVER)
    } else if (errCode === gameCtrl.ERR.INVALID_STATE) {
      _updateAndShowInfo(INFO_ERR_STATE)
    } else if (errCode === gameCtrl.ERR.INVALID_BATTLE) {
      _updateAndShowInfo(INFO_ERR_ID)
    } else if (errCode === gameCtrl.ERR.BATTLE_FULL) {
      _playWithRobot()
    } else if (errCode === gameCtrl.ERR.OPPONENT_QUIT) {
      _updateAndShowInfo(INFO_OPPONENT_QUIT)
    }
  }

  const _handleNewBattle = (battleId) => {
    _resetToReady()
    _updateAndShowInfo(gameCtrl.isUseRobot() ? INFO_ROBOT_FOUND : INFO_OPPONENT_FOUND)
  }

  const _handleStart = () => {
    _updateInfo('')
    _hideMain()
    _showQuit()
    _resetPlayground()
    _showPlayground(() => {
      _updateTime()
      _showTime(() => {
        _updateAndShowInfo('', () => {
          if (!gameCtrl.isPlaying()) return
          timer.startCountDown(pInfo, 3, 1, () => {
            if (!gameCtrl.isPlaying()) return
            _updateInfo(_getStartInfo())
            window.setTimeout(() => {
              _hideInfo()
              gameCtrl.action()
              gameCtrl.setGameStarted(true)
            }, 1000)
          })
        })
      })
    })
  }

  const _playWithRobot = () => {
    gameCtrl.setUseRobot(true)
    gameCtrl.wait()
  }

  const _resetToWait = () => {
    timer.stopCountDown()
    gameCtrl.setGameStarted(false)
    gameCtrl.setUseRobot(false)
    _hideTime()
    _hidePlayground()
    _showMain()
    _hideQuit()

    // Manually hide tooltip (bootstrap tooltip bug on hidden elements)
    btnQuit.tooltip('hide')
  }

  const _resetToReady = () => {
    timer.stopCountDown()
    gameCtrl.setGameStarted(false)
    _showMain()
    _showQuit()
    _stopAutoQuit()
    _startAutoQuit()
  }

  const _resetPlayground = () => {
    playground.resetSnakes(gameCtrl.isAttacking())
    _noBlurPlayground()
    _normalPlayground()
  }

  const _startAutoQuit = () => {
    autoQuitId = window.setTimeout(() => {
      if (gameCtrl.isNotReady()) {
        gameCtrl.quit()
        _resetToWait()
        _updateAndShowInfo(INFO_WELCOME)
      }
    }, TIME_AUTO_QUIT * 1000)
  }

  const _stopAutoQuit = () => {
    if (autoQuitId) {
      window.clearTimeout(autoQuitId)
      autoQuitId = null
    }
  }

  const _normalPlayground = () => {
    if (gameCtrl.isAttacking()) {
      playground.attackShadow()
      playground.attackTime()
    } else if (gameCtrl.isDefending()) {
      playground.defendShadow()
      playground.defendTime()
    }
    playground.stopBlinkTime()
    playground.showTime()
  }

  const _blinkPlayground = () => {
    if (gameCtrl.isAttacking()) {
      playground.blinkAttackShadow()
      playground.attackTime()
    } else if (gameCtrl.isDefending()) {
      playground.blinkDefendShadow()
      playground.defendTime()
    }
    playground.startBlinkTime()
  }

  const _blurPlayground = () => {
    // playground.blur() // Not fully supported
  }

  const _noBlurPlayground = () => {
    playground.noBlur()
  }

  const _showPlayground = (complete) => {
    playground.show(DURATION_NORMAL, complete)
  }

  const _hidePlayground = (complete) => {
    playground.hide(DURATION_NORMAL, complete)
  }

  const _showTime = (complete) => {
    playground.showTime(DURATION_NORMAL, complete)
  }

  const _hideTime = (complete) => {
    playground.hideTime(DURATION_NORMAL, complete)
  }

  const _updateTime = () => {
    const stepsLeft = gameCtrl.roleSwitchStepsLeft()
    const timeLeft = Math.floor(FACTOR_STEP_TO_TIME * stepsLeft)
    playground.updateTime(timeLeft)
  }

  const _showMain = () => {
    _enableAndShow(btnMain)
    _updateMain()
  }

  const _hideMain = () => {
    _disableAndHide(btnMain)
  }

  const _disableMain = () => {
    _disable(btnMain)
  }

  const _updateMain = () => {
    if (gameCtrl.isNotReady()) {
      btnMain.text(INFO_MAIN_READY)
      btnMain.removeClass('start-bg')
      btnMain.addClass('ready-bg')
    } else {
      btnMain.text(INFO_MAIN_START)
      btnMain.removeClass('ready-bg')
      btnMain.addClass('start-bg')
    }
  }

  const _showQuit = () => {
    _enableAndShow(btnQuit)
  }

  const _hideQuit = () => {
    _disableAndHide(btnQuit)
  }

  const _getStartInfo = () => {
    if (gameCtrl.isAttacking()) {
      return INFO_START_ATTACK
    } else if (gameCtrl.isDefending()) {
      return INFO_START_DEFEND
    } else {
      return ''
    }
  }

  const _getPrepareInfo = () => {
    if (gameCtrl.isAttacking()) {
      return INFO_PREPARE_DEFEND
    } else if (gameCtrl.isDefending()) {
      return INFO_PREPARE_ATTACK
    } else {
      return null
    }
  }

  const _showInfo = (complete) => {
    _show(pInfo, complete)
  }

  const _hideInfo = (complete) => {
    _hide(pInfo, () => {
      pInfo.html('')
      if (complete) complete()
    })
  }

  const _updateInfo = (info) => {
    pInfo.html(info)
  }

  const _updateAndShowInfo = (info, complete) => {
    _hideInfo(() => {
      _updateInfo(info)
      _showInfo(() => {
        if (complete) complete()
      })
    })
  }

  const _enableAndShow = (jqObj, complete) => {
    _enable(jqObj)
    _show(jqObj, complete)
  }

  const _disableAndHide = (jqObj, complete) => {
    _disable(jqObj)
    _hide(jqObj, complete)
  }

  const _show = (jqObj, complete) => {
    jqObj.fadeIn(DURATION_NORMAL, complete)
  }

  const _hide = (jqObj, complete) => {
    jqObj.fadeOut(DURATION_NORMAL, complete)
  }

  const _enable = (jqObj) => {
    jqObj.prop('disabled', false)
  }

  const _disable = (jqObj) => {
    jqObj.prop('disabled', true)
  }

  return {
    init: init
  }
})()
