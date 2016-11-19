import React, { Component, PropTypes } from 'react'
import { getNbaGameDetails } from 'helpers/api'
import { Game } from 'components'

const propTypes = {
  game: PropTypes.object.isRequired,
  sport: PropTypes.string.isRequired
}

class GameContainer extends Component {
  constructor() {
    super()
    this.state = {
      details: {},
      expanded: false
    }
    this.toggleDetails = this.toggleDetails.bind(this)
  }
  componentDidMount() {
    this.getGameDetails()
  }
  getGameDetails() {
    if (this.props.sport === 'nba') {
      if (this.props.game.period_time.game_status === '3') {
        getNbaGameDetails(this.props.game.date, this.props.game.id)
          .then(gameDetails => this.setState({ details: gameDetails }))
      }
    }
  }
  toggleDetails() {
    this.setState({ expanded: !this.state.expanded })
  }
  render() {
    return (
      <Game
        game={this.props.game}
        sport={this.props.sport}
        details={this.state.details}
        expanded={this.state.expanded}
        toggleDetails={this.toggleDetails}/>
    )
  }
}

GameContainer.propTypes = propTypes

export default GameContainer
