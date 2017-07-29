import React, { Component } from 'react'
import { Game } from 'components'
import { getNbaGameDetails } from 'helpers/api'

class GameContainer extends Component {
  constructor() {
    super()
    this.state = {
      details: {},
      isExpanded: false,
      isHovered: false,
      isiOS: false,
      hasLoaded: false
    }
    this.showDetails = this.showDetails.bind(this)
    this.scaleGame = this.scaleGame.bind(this)
    this.logoHasLoaded = this.logoHasLoaded.bind(this)
  }
  componentDidMount() {
    const testDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    if (testDevice) {
      this.setState({ isiOS: true })
    }
  }
  showDetails() {
    this.setState({ isExpanded: !this.state.isExpanded })
  }
  scaleGame() {
    this.setState({ isHovered: !this.state.isiOS && !this.state.isHovered })
  }
  logoHasLoaded() {
    this.setState({ hasLoaded: true })
  }
  render() {
    return (
      <Game
        showDetails={this.showDetails}
        scaleGame={this.scaleGame}
        logoHasLoaded={this.logoHasLoaded}
        {...this.state}
        {...this.props}
      />
    )
  }
}

export default GameContainer
