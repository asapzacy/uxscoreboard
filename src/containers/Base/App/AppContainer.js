import React, { Component } from 'react'
import { App } from 'components'

class AppContainer extends Component {
  state = {}
  componentDidMount() {
    document.body.style.opacity = '1'
  }
  render() {
    return <App {...this.state} />
  }
}

export default AppContainer
