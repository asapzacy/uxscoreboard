import React, { Component, PropTypes } from 'react'
import { Game } from 'components'

const propTypes = {
  game: PropTypes.object.isRequired,
  toggleDetails: PropTypes.func
}

class GameContainer extends Component {
  constructor() {
    super()
    this.state = { expanded: false }
    this.toggleDetails = this.toggleDetails.bind(this)
  }
  toggleDetails() {
   this.setState({ expanded: !this.state.expanded })
  }
  render() {
    return (
      <Game
        game={this.props.game}
        toggleDetails={this.toggleDetails}
        expanded={this.state.expanded}
      />
    )
  }
}

GameContainer.propTypes = propTypes

export default GameContainer
