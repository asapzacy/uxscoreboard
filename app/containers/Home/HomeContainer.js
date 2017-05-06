import React, { Component } from 'react'
import { Home } from 'components'

class HomeContainer extends Component {
  componentDidMount() {
    document.title = 'uxscoreboard'
    document.getElementsByTagName('meta')['description'].content = 'uxscoreboard | A sports scoreboard web app built on ES6 and React.js—features MLB, NBA, NFL, and NHL games.'
  }
  render() {
    return <Home />
  }
}

export default HomeContainer
