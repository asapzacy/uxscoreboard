import React, { Component } from 'react'
import { Header, Footer, Test } from 'components'
import { mainContainer, innerContainer } from './styles.css'

class MainContainer extends Component {
  constructor() {
    super()
    this.state = {
      isMenuOpen: false,
      menuHeight: 0,
      appWidth: 0
    }
    this.triggerMenu = this.triggerMenu.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
    this.getWidth = this.getWidth.bind(this)
  }
  triggerMenu() {
    const header = document.querySelector('header')
    const navHeight = header.querySelector('nav').scrollHeight
    if (this.state.isMenuOpen) {
      window.removeEventListener('click', this.hideMenu)
    } else {
      window.addEventListener('click', this.hideMenu)
    }
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
      menuHeight: !this.state.isMenuOpen ? navHeight : 0
    })
  }
  hideMenu(e) {
    let el = e.target || e.srcElement
    while (el) {
      if (el.nodeName === 'A') {
        window.removeEventListener('click', this.hideMenu)
        this.triggerMenu()
      }
      el = el.parentNode
    }
  }
  getWidth() {
    this.setState({
      'appWidth': window.innerWidth
    })
  }
  componentDidMount() {
    this.getWidth()
    window.addEventListener('resize', this.getWidth, false)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.getWidth, false)
  }
  render() {
    const menuHeight = this.state.isMenuOpen ? `calc(100% + ${this.state.menuHeight / 2}px)` : '100%'
    return (
      <div className={mainContainer} style={{height:menuHeight}}>
        <Header triggerMenu={this.triggerMenu} {...this.state} />
        <main className={innerContainer}>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }
}

export default MainContainer
