import React, { Component, PropTypes } from 'react'
import { Game } from 'components'

const propTypes = {
  game: PropTypes.object.isRequired,
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
        expanded={this.state.expanded}
        toggleDetails={this.toggleDetails}
      />
    )
  }
}

GameContainer.propTypes = propTypes

export default GameContainer
