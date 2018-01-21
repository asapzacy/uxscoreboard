import React, { Component } from 'react'
import { NotFound } from 'components'
import { updatePageInfo } from 'config/metadata'

class NotFoundContainer extends Component {
  componentDidMount() {
    const pageInfo = {
      title: `404 · uxscoreboard`
    }
    updatePageInfo(pageInfo)
  }
  render() {
    return <NotFound />
  }
}

export default NotFoundContainer
