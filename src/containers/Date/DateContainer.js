import React, { Component } from 'react'
import { Date } from 'components'

class DateContainer extends Component {
  constructor() {
    super()
    this.state = {
      width: 0
    }
    this.getScreenWidth = this.getScreenWidth.bind(this)
  }
  componentDidMount() {
    this.getScreenWidth()
    window.addEventListener('resize', this.getScreenWidth, false)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.getScreenWidth, false)
  }
  getScreenWidth() {
    this.setState({
      width: window.innerWidth
    })
  }
  render() {
    return <Date {...this.state} {...this.props} />
  }
}

export default DateContainer
