import React, { Component } from 'react'
import { Details } from 'components'
import { mlbMatchupProps, nbaMatchupProps, nhlMatchupProps } from 'helpers/props/matchupProps'


class DetailsContainer extends Component {
  constructor() {
    super()
    this.state = { display: 'boxscore' }
    this.switchView = this.switchView.bind(this)
  }
  switchView() {
    this.setState({ display: this.state.display === 'boxscore' ? 'team stats' : 'boxscore' })
  }
  render() {
    return <Details switchView={this.switchView} {...this.state} {...this.props}  />
  }
}

export default DetailsContainer
