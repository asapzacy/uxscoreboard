import React from 'react'
import { Navigation, Footer } from 'components'
import { mainContainer, innerContainer } from './styles.css'

const MainContainer = React.createClass({
  render() {
    return (
      <div className={mainContainer}>
        <Navigation />
        <div className={innerContainer}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
})

export default MainContainer
