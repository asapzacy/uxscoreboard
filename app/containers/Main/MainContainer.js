import React, { Component } from 'react'
import { Header, Footer } from 'components'
import WebFont from 'webfontloader'
import { mainContainer, innerContainer } from './styles.css'

class MainContainer extends Component {
  constructor() {
    super()
    this.state = {
      screenWidth: 0,
      menuHeight: 0,
      isMenuOpen: false,
    }
    this.getScreenWidth = this.getScreenWidth.bind(this)
    this.triggerMenu = this.triggerMenu.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
  }
  componentDidMount() {
    this.loadFonts()
    this.getScreenWidth()
    window.addEventListener('resize', this.getScreenWidth)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.getScreenWidth)
  }
  loadFonts() {
    WebFont.load({
      google: { families: [ 'Comfortaa:300,400,700' ] },
      active() { document.getElementById('app').classList.add('ready') },
      classes: false
    })
  }
  getScreenWidth() {
    this.setState({ 'screenWidth': window.innerWidth }, () => {
      const header = document.querySelector('header')
      const navHeight = header.querySelector('nav').scrollHeight
      if (this.state.screenWidth >= 667) {
        this.setState({ menuHeight: 'initial', isMenuOpen: false })
        window.removeEventListener('click', this.hideMenu)
      } else {
        this.setState({ menuHeight: this.state.isMenuOpen ? navHeight : 0 })
      }
    })
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
  hideMenu(event) {
    let el = event.target || event.srcElement
    while (el) {
      if (el.nodeName === 'A') {
        window.removeEventListener('click', this.hideMenu)
        this.triggerMenu()
      }
      el = el.parentNode
    }
  }
  render() {
    const { isMenuOpen, menuHeight } = this.state
    const appHeight = { height: isMenuOpen ? `calc(100% + ${menuHeight / 2}px)` : '100%' }
    return (
      <div className={mainContainer} style={appHeight}>
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
