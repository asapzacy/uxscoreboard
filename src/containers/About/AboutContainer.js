import React, { Component } from 'react'
import { About } from 'components'
import { updatePageInfo } from 'config/metadata'

class AboutContainer extends Component {
  componentDidMount() {
    const pageInfo = {
      title: 'about · uxscoreboard'
    }
    updatePageInfo(pageInfo)
  }
  render() {
    return <About />
  }
}

export default AboutContainer
