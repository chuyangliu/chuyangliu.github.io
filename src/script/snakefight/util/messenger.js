/* global Stomp, SockJS */

module.exports = (() => {
  'use strict'

  let stompClient = null

  const connect = (connDest, sucCb, errCb, subscribeDest, subscribeCb) => {
    stompClient = Stomp.over(new SockJS(connDest))
    stompClient.debug = null
    stompClient.connect({},
      (frame) => {
        stompClient.subscribe(subscribeDest, (msg) => {
          console.log('[messenger] receive ' + msg.body)
          if (subscribeCb) subscribeCb(msg.body)
        })
        if (sucCb) sucCb(frame)
      },
      (err) => {
        stompClient = null
        if (errCb) errCb()
      }
    )
  }

  const disconnect = () => {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log('[messenger] disconnected')
      })
      stompClient = null
    }
  }

  const isConnected = () => !!stompClient

  const send = (dest, obj) => {
    if (stompClient) {
      const dataStr = JSON.stringify(obj)
      console.log('[messenger] send ' + dataStr + ' | dest=' + dest)
      stompClient.send(dest, {}, dataStr)
    }
  }

  return {
    connect: connect,
    disconnect: disconnect,
    isConnected: isConnected,
    send: send
  }
})()
