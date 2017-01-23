import React, { Component } from 'react'
import { Details } from 'components'
import { mlbMatchupProps, nbaMatchupProps, nhlMatchupProps } from 'helpers/props/matchupProps'


class DetailsContainer extends Component {
  constructor() {
    super()
    this.state = { panel: '' }
    this.switchPanel = this.switchPanel.bind(this)
  }
  componentDidMount() {
    this.setState({ panel: 'boxScore' })
  }
  switchPanel(newPanel) {
    this.setState({ panel: newPanel })
  }
  render() {
    return <Details switchPanel={this.switchPanel} {...this.state} {...this.props}  />
  }
}

export default DetailsContainer
