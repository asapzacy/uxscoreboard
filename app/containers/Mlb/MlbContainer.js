import React, { Component } from 'react'
import { Mlb } from 'components'

class MlbContainer extends Component {
  render() {
    return (
      <div>
       {this.props.children || <Mlb />}
      </div>
    )
  }
}

export default MlbContainer
