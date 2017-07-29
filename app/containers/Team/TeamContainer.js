import React, { Component } from 'react'
import { Team } from 'components'

class TeamContainer extends Component {
  constructor() {
    super()
    this.state = { hasLoaded: false }
    this.logoHasLoaded = this.logoHasLoaded.bind(this)
  }
  logoHasLoaded() {
    this.setState({ hasLoaded: true })
  }
  render() {
    return (
      <Team
        {...this.state}
        {...this.props}
        logoHasLoaded={this.logoHasLoaded}
      />
    )
  }
}

export default TeamContainer
