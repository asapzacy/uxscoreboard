import React, { Component, PropTypes } from 'react'
import { Game } from 'components'

const propTypes = {
  game: PropTypes.object.isRequired,
  sport: PropTypes.string.isRequired,
  type: PropTypes.string
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
        sport={this.props.sport}
        type={this.props.type}
        expanded={this.state.expanded}
        toggleDetails={this.toggleDetails}
      />
    )
  }
}

GameContainer.propTypes = propTypes

export default GameContainer
