import React, { Component } from 'react'
import MarchMadness from './MarchMadness'

class MarchMadnessContainer extends Component {
  // this.schedule = [
  //   {
  //     text: 'First Four',
  //     dates: [

  //     ]
  //   }
  // ]
  render() {
    return <MarchMadness {...this.state} />
  }
}

export default MarchMadnessContainer
