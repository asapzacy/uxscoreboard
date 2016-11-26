import React, { Component } from 'react'
import { Date } from 'components'

class DateContainer extends Component {
  constructor() {
    super()
    this.state = {
      width: 0
    }
    this.getWidth = this.getWidth.bind(this)
  }
  componentDidMount() {
    this.getWidth()
    window.addEventListener('resize', this.getWidth)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.getWidth)
  }
  getWidth() {
    this.setState({ 'width': window.innerWidth })
  }
  render() {
    return (
      <Date {...this.state} {...this.props} />
    )
  }
}

export default DateContainer
