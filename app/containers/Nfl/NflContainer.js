import React, { Component } from 'react'
import { Nfl } from 'components'

class NflContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      isValid: false,
      scores: {},
      date: '',
      today: ''
    }
  }
  componentDidMount() {
    this.setState({ isLoading: false })
  }
  render() {
    return <Nfl {...this.state} />
  }
}

export default NflContainer
