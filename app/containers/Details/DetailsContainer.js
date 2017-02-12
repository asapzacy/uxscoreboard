import React, { Component } from 'react'
import { Details } from 'components'

class DetailsContainer extends Component {
  constructor() {
    super()
    this.state = { panel: '', details: {} }
    this.switchPanel = this.switchPanel.bind(this)
  }
  componentDidMount() {
    this.setState({ panel: 'boxScore' })
  }
  switchPanel(newPanel) {
    this.setState({ panel: newPanel })
  }
  updateDetails(newDetails) {
    this.setState({ details: newDetails })
  }
  render() {
    return <Details switchPanel={this.switchPanel} {...this.state} {...this.props} />
  }
}

export default DetailsContainer
