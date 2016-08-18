import React from 'react'
import { Sport } from 'components'

const SportContainer = React.createClass({
  render() {
    return (
      <div>
       {this.props.children || <Sport />}
      </div>
    )
  }
})

export default SportContainer
