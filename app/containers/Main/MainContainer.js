import React, { Component } from 'react'
import { Header, Footer } from 'components'
import { mainContainer, innerContainer } from './styles.css'

class MainContainer extends Component {
  constructor() {
    super()
    this.state = {
      expanded: false,
      height: 0
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  toggleMenu() {
    const navHeight = document.querySelector('header nav').scrollHeight
    this.setState({
      expanded: !this.state.expanded,
      height: !this.state.expanded ? navHeight : 0
    })
  }
  render() {
    return (
      <div className={mainContainer}>
        <Header
          expanded={this.state.expanded}
          height={this.state.height}
          toggleMenu={this.toggleMenu}
        />
        <main className={innerContainer}>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }
}

export default MainContainer
