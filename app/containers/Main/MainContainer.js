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
      window.addEventListener('click', this.hideMenu)
    } else {
      window.removeEventListener('click', this.hideMenu)
    }
    this.setState({
      visible: !this.state.visible,
      height: !this.state.visible ? navHeight : 0
    })
  }
  hideMenu(e) {
    let el = e.target || e.srcElement
    while (el) {
      if (el.nodeName === 'A') {
        window.removeEventListener('click', this.hideMenu)
        this.toggleMenu()
      }
      el = el.parentNode
    }
  }
  render() {
    const height = this.state.visible ? `calc(100% + ${this.state.height/2}px)` : '100%'
    return (
      <div className={mainContainer} style={{height:height}}>
        <Header toggleMenu={this.toggleMenu} {...this.state} />
        <main className={innerContainer}>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }
}

export default MainContainer
