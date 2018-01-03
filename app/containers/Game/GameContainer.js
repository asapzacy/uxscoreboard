import React, { Component } from 'react'
import { Game } from 'components'

class GameContainer extends Component {
  state = {
    isExpanded: false,
    isHovered: false,
    isiOS: false,
    hasLoaded: false,
    details: {}
  }
  componentDidMount() {
    const testDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    if (testDevice) {
      this.setState({ isiOS: true })
    }
  }
  showDetails = () => {
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }))
  }
  scaleGame = () => {
    this.setState({
      isHovered: !this.state.isiOS && !this.state.isHovered
    })
  }
  logoHasLoaded = () => {
    this.setState({ hasLoaded: true })
  }
  render() {
    return (
      <Game
        {...this.props}
        {...this.state}
        showDetails={this.showDetails}
        scaleGame={this.scaleGame}
        logoHasLoaded={this.logoHasLoaded}
      />
    )
  }
}

export default GameContainer
