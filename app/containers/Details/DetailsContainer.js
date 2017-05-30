import React, { Component } from 'react'
import { Details } from 'components'

class DetailsContainer extends Component {
  constructor() {
    super()
    this.state = {
      details: {},
      panels: [],
      activePanel: ''
     }
    this.switchPanel = this.switchPanel.bind(this)
  }
  componentDidMount() {
    this.setState({
      panels: [ 'box score', 'team stats', 'leaders' ],
      activePanel: 'box score'
    })
  }
  switchPanel(newPanel) {
    this.setState({ activePanel: newPanel })
  }
  updateDetails(newDetails) {
    this.setState({ details: newDetails })
  }
  render() {
    return <Details switchPanel={this.switchPanel} {...this.state} {...this.props} />
  }
}

export default DetailsContainer
