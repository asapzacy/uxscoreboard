import React from 'react'
import { Link } from 'react-router'
import { Mlb } from 'components'

const MlbContainer = React.createClass({
  render() {
    return (
      <div>
       {this.props.children || <Mlb />}
      </div>
    )
  }
})

export default MlbContainer
