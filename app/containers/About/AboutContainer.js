import React, { Component } from 'react'
import { About } from 'components'

import axios from 'axios'

const testing = (dt = '20170602') => {
  const url = `/api/mlb/scores/${dt}`
  return axios.get(url)
    .then(response => response.data)
    .catch(error => error.status)
}


class AboutContainer extends Component {
  constructor() {
    super()
    this.state = {
      scores: {}
    }
  }
  componentDidMount() {
    testing()
      .then(data => {
        this.setState({ scores: data })
      })
  }
  render() {
    return <About />
  }
}

export default AboutContainer
