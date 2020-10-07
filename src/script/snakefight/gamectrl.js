/* global uuidv4 */

module.exports = (rbt) => {
  'use strict'

  const DEST_ENDPOINT = '/ws/ep'
  const DEST_SUBSCRIBE = '/ws/sb'
  const DEST_WAIT = '/game/wait'
  const DEST_QUIT_WAIT = '/game/quit-wait'
  const DEST_READY = '/game/ready'
  const DEST_ACTION = '/game/action'
  const DEST_DONE = '/game/done'
  const DEST_QUIT_BATTLE = '/game/quit-btl'

  const STATE = {
    OFFLINE: '0',
    WAITING: '1',
    NOT_READY: '2',
    READY: '3',
    ATTACKING: '4',
    DEFENDING: '5'
  }

  const ACTION = {
    LEFT: '1',
    UP: '2',
    RIGHT: '3',
    DOWN: '4'
  }

  const MSG = {
    ERR: '0',
    BID: '1',
    START: '2',
    ACTION: '3'
  }

  const ERR = {
    SERVER: '1',
    INVALID_STATE: '2',
    INVALID_BATTLE: '3',
    BATTLE_FULL: '100',
    OPPONENT_QUIT: '200'
  }

  // steps
  const FREQ_SWITCH = 51
  const FREQ_FOOD = 5
  const THRESHOLD_ABOUT_TO_SWITCH = 15

  const MSG_SEPARATOR = '_'

  const robot = rbt
  const messenger = require('./util/messenger.js')

  let playerId = null
  let playerState = STATE.OFFLINE

  let battleId = null
  let random = null

  let steps = 0
  let gameStarted = false
  let nextAction = null

  let onDataReceived = null
  let onTakingActions = null
  let onCreatingFood = null
  let onSwitchingRole = null
  let onAboutToSwitch = null
  let onActionsFinished = null

  let useRobot = false

  const setGameStarted = (s) => { gameStarted = !!s }

  const isGameStarted = () => !!gameStarted

  const isOffline = () => playerState === STATE.OFFLINE

  const isWaiting = () => playerState === STATE.WAITING

  const isNotReady = () => playerState === STATE.NOT_READY

  const isReady = () => playerState === STATE.READY

  const isAttacking = () => playerState === STATE.ATTACKING

  const isDefending = () => playerState === STATE.DEFENDING

  const isPlaying = () => isAttacking() || isDefending()

  const setUseRobot = (u) => { useRobot = u }

  const isUseRobot = () => !!useRobot

  const setNextAction = (action) => { nextAction = action }

  const getNextAction = () => nextAction

  const setOnDataReceived = (cb) => { onDataReceived = cb }

  const setOnTakingActions = (cb) => { onTakingActions = cb }

  const setOnCreatingFood = (cb) => { onCreatingFood = cb }

  const setOnSwitchingRole = (cb) => { onSwitchingRole = cb }

  const setOnAboutToSwitch = (cb) => { onAboutToSwitch = cb }

  const setOnActionsFinished = (cb) => { onActionsFinished = cb }

  const getRandGenerator = () => random

  const genPlayerId = () => {
    if (!playerId) playerId = uuidv4().replace(/-/g, '')
  }

  const roleSwitchStepsLeft = () => {
    if (steps === 0) return FREQ_SWITCH - 1 // Game not start yet
    let tmp = steps
    while (tmp % FREQ_SWITCH !== 0) ++tmp
    return tmp - steps
  }

  const connect = (sucCb, errCb) => {
    messenger.connect(
      DEST_ENDPOINT,
      sucCb,
      () => {
        _resetToWait(true)
        if (errCb) errCb()
      },
      DEST_SUBSCRIBE + '/' + playerId,
      _handleMsg
    )
  }

  const disconnect = () => {
    messenger.disconnect()
  }

  const isConnected = () => {
    return messenger.isConnected()
  }

  const wait = () => {
    if (isOffline()) {
      _setPlayerState(STATE.WAITING)
      if (useRobot) {
        _handleMsg(MSG.BID + MSG_SEPARATOR + robot.fakeBattleId())
      } else {
        messenger.send(DEST_WAIT, {
          playerId: playerId
        })
      }
    } else {
      throw new Error('[gamectrl] call wait() in state ' + playerState)
    }
  }

  const quitWait = () => {
    if (isWaiting()) {
      if (!useRobot) {
        messenger.send(DEST_QUIT_WAIT, {
          playerId: playerId
        })
      }
      _resetToWait()
    } else {
      throw new Error('[gamectrl] call quitWait() in state ' + playerState)
    }
  }

  const ready = () => {
    if (isNotReady()) {
      _setPlayerState(STATE.READY)
      if (useRobot) {
        _handleMsg(MSG.START + MSG_SEPARATOR +
          robot.fakeSeed() + MSG_SEPARATOR + robot.fakeAttack())
        robot.stop()
        robot.start((selfAction, robotAction) => {
          _handleMsg(MSG.ACTION + MSG_SEPARATOR +
            selfAction + MSG_SEPARATOR + robotAction)
        })
      } else {
        messenger.send(DEST_READY, {
          playerId: playerId,
          battleId: battleId
        })
      }
    } else {
      throw new Error('[gamectrl] call ready() in state ' + playerState)
    }
  }

  const action = () => {
    if (isPlaying()) {
      if (!useRobot) {
        messenger.send(DEST_ACTION, {
          playerId: playerId,
          battleId: battleId,
          action: Number(nextAction)
        })
      }
    } else {
      throw new Error('[gamectrl] call action() in state ' + playerState)
    }
  }

  const done = () => {
    if (isPlaying()) {
      if (useRobot) {
        robot.stop()
      } else {
        messenger.send(DEST_DONE, {
          playerId: playerId,
          battleId: battleId
        })
      }
      _resetToReady()
    } else {
      throw new Error('[gamectrl] call done() in state ' + playerState)
    }
  }

  const quitBattle = () => {
    if (!isOffline() && !isWaiting()) {
      if (useRobot) {
        robot.stop()
      } else {
        messenger.send(DEST_QUIT_BATTLE, {
          playerId: playerId,
          battleId: battleId
        })
      }
      _resetToWait()
    } else {
      throw new Error('[gamectrl] call quitBattle() in state ' + playerState)
    }
  }

  const quit = () => {
    if (!isOffline()) {
      if (isWaiting()) {
        quitWait()
      } else {
        quitBattle()
      }
    }
    disconnect()
  }

  const _resetToWait = (clrPlayerId) => {
    if (clrPlayerId === true) playerId = null
    _setPlayerState(STATE.OFFLINE)
    battleId = null
    random = null
    steps = 0
    nextAction = null
  }

  const _resetToReady = () => {
    _setPlayerState(STATE.NOT_READY)
    random = null
    steps = 0
    nextAction = null
  }

  const _handleMsg = (msg) => {
    console.log('[gamectrl] _handleMsg() | ' + msg)
    const [type, data1, data2] = msg.split(MSG_SEPARATOR, 3)
    if (type === MSG.ERR) {
      if (isOffline()) return
      _handleErrMsg(data1)
    } else if (type === MSG.BID) {
      if (!isWaiting()) return
      _handleBattleMsg(data1)
    } else if (type === MSG.START) {
      if (!isReady()) return
      _handleStartMsg(data1, data2 === '1')
    } else if (type === MSG.ACTION) {
      if (!isPlaying()) return
      _handleActionMsg(data1, data2)
    }
    if (onDataReceived) onDataReceived(type, data1, data2)
  }

  const _handleErrMsg = (errCode) => {
    _resetToWait()
  }

  const _handleBattleMsg = (id) => {
    battleId = id
    _setPlayerState(STATE.NOT_READY)
  }

  const _handleStartMsg = (randSeed, attack) => {
    steps = 0
    random = new Math.seedrandom(randSeed)
    _setPlayerState(attack ? STATE.ATTACKING : STATE.DEFENDING)
    setNextAction(attack ? ACTION.RIGHT : ACTION.LEFT)
  }

  const _handleActionMsg = (selfAction, opponentAction) => {
    if (onTakingActions) onTakingActions(selfAction, opponentAction)
    if (!isPlaying()) return
    if (steps > 0 && steps % FREQ_FOOD === 0) {
      if (onCreatingFood) onCreatingFood()
    }
    if (steps > 0 && steps % FREQ_SWITCH === 0) {
      _setPlayerState(isAttacking() ? STATE.DEFENDING : STATE.ATTACKING)
      if (onSwitchingRole) onSwitchingRole()
    }
    ++steps
    if (roleSwitchStepsLeft() === THRESHOLD_ABOUT_TO_SWITCH) {
      if (onAboutToSwitch) onAboutToSwitch()
    }
    if (onActionsFinished) onActionsFinished()
  }

  const _setPlayerState = (state) => {
    playerState = state
    console.log('[gamectrl] state=' + state)
  }

  return {
    ACTION: ACTION,
    MSG: MSG,
    ERR: ERR,

    setGameStarted: setGameStarted,
    isGameStarted: isGameStarted,

    isOffline: isOffline,
    isWaiting: isWaiting,
    isNotReady: isNotReady,
    isReady: isReady,
    isAttacking: isAttacking,
    isDefending: isDefending,
    isPlaying: isPlaying,

    setUseRobot: setUseRobot,
    isUseRobot: isUseRobot,
    setNextAction: setNextAction,
    getNextAction: getNextAction,

    setOnDataReceived: setOnDataReceived,
    setOnTakingActions: setOnTakingActions,
    setOnCreatingFood: setOnCreatingFood,
    setOnSwitchingRole: setOnSwitchingRole,
    setOnAboutToSwitch: setOnAboutToSwitch,
    setOnActionsFinished: setOnActionsFinished,

    getRandGenerator: getRandGenerator,

    genPlayerId: genPlayerId,
    roleSwitchStepsLeft: roleSwitchStepsLeft,

    connect: connect,
    disconnect: disconnect,
    isConnected: isConnected,

    wait: wait,
    quitWait: quitWait,
    ready: ready,
    action: action,
    done: done,
    quitBattle: quitBattle,
    quit: quit
  }
}
