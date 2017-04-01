import React, { Component } from 'react'
import { Game } from 'components'

class GameContainer extends Component {
  constructor() {
    super()
    this.state = {
      isExpanded: false,
      isHovered: false
    }
    this.showDetails = this.showDetails.bind(this)
    this.scaleGame = this.scaleGame.bind(this)
  }
  showDetails() {
    this.setState({ isExpanded: !this.state.isExpanded })
  }
  scaleGame() {
    this.setState({ isHovered: !this.state.isHovered })
  }
  render() {
    return <Game showDetails={this.showDetails} scaleGame={this.scaleGame} {...this.state} {...this.props} />
  }
}

export default GameContainer
