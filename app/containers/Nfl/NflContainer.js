import React from 'react'
import { Nfl } from 'components'

const NflContainer = React.createClass({
  render() {
    return (
      <div>
       {this.props.children || <Nfl />}
      </div>
    )
  }
})

export default NflContainer
