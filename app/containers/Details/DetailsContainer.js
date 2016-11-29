import React, { Component } from 'react'
import ReactHeight from 'react-height'
import { Details } from 'components'

class DetailsContainer extends Component {
  constructor() {
    super()
    this.state = {
      height: 0
    }
  }
  toggleDetails(height) {
    this.setState({
      height
    })
  }
  render() {
    console.log(this)
    return (
      <ReactHeight onHeightReady={height => this.toggleDetails(height)}>
        <Details {...this.state} {...this.props} />
      </ReactHeight>
    )
  }
}

export default DetailsContainer
