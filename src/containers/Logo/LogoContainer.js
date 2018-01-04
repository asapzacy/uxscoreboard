import React, { Component } from 'react'
import { Logo } from 'components'

class LogoContainer extends Component {
  constructor() {
    super()
    this.state = { }
    this.onLoad = this.onLoad.bind(this)
  }
  onLoad() {
    this.props.logoHasLoaded()
  }
  render() {
    return (
      <Logo {...this.state} {...this.props} fn={this.onLoad} />
    )
  }
}

export default LogoContainer
