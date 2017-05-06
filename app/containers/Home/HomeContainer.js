import React, { Component } from 'react'
import { Home } from 'components'

class HomeContainer extends Component {
  componentDidMount() {
    document.title = 'uxscoreboard'
  }
  render() {
    return <Home />
  }
}

export default HomeContainer
