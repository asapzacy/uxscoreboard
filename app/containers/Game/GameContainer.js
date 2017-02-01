import React, { Component } from 'react'
import { Game } from 'components'

class GameContainer extends Component {
  constructor() {
    super()
    this.state = { expanded: false }
    this.showDetails = this.showDetails.bind(this)
  }
  showDetails() {
    this.setState({ expanded: !this.state.expanded })
  }
  render() {
    return <Game showDetails={this.showDetails} {...this.state} {...this.props} />
  }
}

export default GameContainer
