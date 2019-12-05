import React, { Component } from 'react'
import WebFont from 'webfontloader'

import { Header, Footer } from 'components'
import Routes from 'config/Routes'
import { logPageView } from 'config/analytics'

import s from './Main.scss'

class MainContainer extends Component {
  constructor() {
    super()
    this.state = {
      screenWidth: 0,
      menuHeight: 0,
      isMenuOpen: false
    }
    this.triggerMenu = this.triggerMenu.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
    this.getScreenWidth = this.getScreenWidth.bind(this)
  }

  componentDidMount() {
    /* eslint-disable-next-line */
    console.log('asappppppppppp')
    this.loadFonts()
    this.getScreenWidth()
    window.addEventListener('resize', this.getScreenWidth)
  }

  componentDidUpdate() {
    this.foo()
    logPageView()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getScreenWidth)
  }

  loadFonts() {
    WebFont.load({
      google: { families: ['Comfortaa:300,400,700'] },
      active() {
        document.getElementById('app').classList.add('ready')
      },
      classes: false
    })
  }

  getScreenWidth() {
    this.setState({ screenWidth: window.innerWidth }, () => {
      const header = document.querySelector('header')
      const navHeight = header.querySelector('nav').scrollHeight
      if (this.state.screenWidth >= 667) {
        this.setState({
          menuHeight: 'initial',
          isMenuOpen: false
        })
        window.removeEventListener('click', this.hideMenu)
      } else {
        this.setState({
          menuHeight: this.state.isMenuOpen ? navHeight : 0
        })
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
    const appHeight = {
      height: isMenuOpen ? `calc(100% + ${menuHeight / 2}px)` : '100%'
    }
    return (
      <div className={s.outerContainer} style={appHeight}>
        <Header triggerMenu={this.triggerMenu} {...this.state} />
        <main className={s.innerContainer}>
          <Routes />
        </main>
        <Footer />
      </div>
    )
  }
}

export default MainContainer
