import React, { Component } from 'react'
import { Map } from 'components'

class MapContainer extends Component {
  constructor() {
    super()
    this.state = {
      sport: 'nba'
    }
  }
  componentDidMount() {
    window.setTimeout(() => {
      console.log('ay')
      window.dispatchEvent(new Event('resize'))
    }, 500)
  }
  test = () => {
    console.log('ay')
    window.dispatchEvent(new Event('resize'))
  }
  render() {
    return <Map {...this.state} />
  }
}

export default MapContainer
