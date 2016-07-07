import React from 'react'
import { Navigation } from 'components'
import { mainContainer, innerContainer } from './styles.css'

const MainContainer = React.createClass({
  render() {
    return (
      <div className={mainContainer}>
        <Navigation />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default MainContainer
