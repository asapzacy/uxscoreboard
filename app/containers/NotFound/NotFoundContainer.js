import React, { Component } from 'react'
import { container, content } from './styles.css'

class NotFoundContainer extends Component {
  render() {
    return (
      <div className={container}>
        <p className={content}>{'404'}</p>
      </div>
    )
  }
}

export default NotFoundContainer
