import React, { Component } from 'react'
import { Header, Footer } from 'components'
import { mainContainer, innerContainer } from './styles.css'

class MainContainer extends Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      height: 0
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
  }
  toggleMenu() {
    const header = document.querySelector('header')
    const navHeight = header.querySelector('nav').scrollHeight
    if (!this.state.visible) {
      header.addEventListener('click', this.hideMenu)
    } else {
      header.removeEventListener('click', this.hideMenu)
    }
    this.setState({
      visible: !this.state.visible,
      height: !this.state.visible ? navHeight : 0
    })
  }
  hideMenu(e) {
    if (e.target.tagName === 'A' || e.target.tagName === 'IMG') {
      document.querySelector('header').removeEventListener('click', this.hideMenu)
      this.toggleMenu()
    }
  }
  render() {
    return (
      <div className={mainContainer}>
        <Header
          visible={this.state.visible}
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
