import React, { Component } from 'react'
import { Details } from 'components'

class DetailsContainer extends Component {
  state = { panels: [], activePanel: '' }
  componentDidMount() {
    const defaultPanels = ['box score', 'team stats', 'leaders']
    this.setState({
      panels: defaultPanels,
      activePanel: defaultPanels[0]
    })
  }
  switchPanel = newPanel => {
    this.setState({ activePanel: newPanel })
  }
  render() {
    return (
      <Details {...this.state} {...this.props} switchPanel={this.switchPanel} />
    )
  }
}

export default DetailsContainer
