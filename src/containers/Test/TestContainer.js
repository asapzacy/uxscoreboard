import React, { Component } from 'react'
import { Test } from 'components'

class TestContainer extends Component {
  render() {
    const socket = new WebSocket('wss://clusterfuck.run:8443/chatsocket')
    console.log(socket)
    socket.addEventListener('message', event => {
      console.log('incoming: ', event.data)
    })
    return <Test />
  }
}

export default TestContainer
