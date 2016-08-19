import React, { Component } from 'react'
import { Nfl } from 'components'

class NflContainer extends Component {
  render() {
    return (
      <div>
       {this.props.children || <Nfl />}
      </div>
    )
  }
}

export default NflContainer
