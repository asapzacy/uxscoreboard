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
  componentDidMount() {
    window.addEventListener('hashchange', this.hideMenu.bind(this))
  }
  hideMenu() {
    if (this.state.visible) { this.toggleMenu() }
  }
  toggleMenu() {
    const navHeight = document.querySelector('header nav').scrollHeight
    this.setState({
      visible: !this.state.visible,
      height: !this.state.visible ? navHeight : 0
    })
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
