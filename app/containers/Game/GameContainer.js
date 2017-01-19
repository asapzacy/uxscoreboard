import React, { Component } from 'react'
import { Game } from 'components'
import { getNbaGameDetails } from 'helpers/api'

class GameContainer extends Component {
  constructor() {
    super()
    this.state = {
      expanded: false
    }
    this.showDetails = this.showDetails.bind(this)
  }
  // componentDidMount() {
  //   if (this.props.league === 'nba') {
  //     this.gameDetails()
  //   }
  // }
  showDetails() {
    this.setState({ expanded: !this.state.expanded })
  }
  // gameDetails() {
  //   getNbaGameDetails(this.props.date, this.props.game.id)
  //     .then(data => {
  //       console.log(data.sports_content.game)
  //       this.props.game = data.sports_content.game
  //     })
  // }
  render() {
    return <Game showDetails={this.showDetails} {...this.state} {...this.props} />
  }
}

export default GameContainer
