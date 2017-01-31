import React, { Component } from 'react'
import { Game } from 'components'

import { getNbaGameDetails } from 'helpers/api'

class GameContainer extends Component {
  constructor() {
    super()
    this.state = { expanded: false }
    this.showDetails = this.showDetails.bind(this)
  }
  showDetails() {
    this.setState({ expanded: !this.state.expanded })
  }
  render() {
    return <Game showDetails={this.showDetails} {...this.state} {...this.props} />
  }
}

export default GameContainer


//
// import React, { Component } from 'react'
// import { Game } from 'components'
//
// import { getNbaGameDetails } from 'helpers/api'
//
// class GameContainer extends Component {
//   constructor() {
//     super()
//     this.state = {
//       expanded: false,
//       details: {}
//      }
//     this.showDetails = this.showDetails.bind(this)
//     this.init = this.init.bind(this)
//   }
//   componentDidMount() {
//     this.init()
//   }
//   showDetails() {
//     this.setState({ expanded: !this.state.expanded })
//   }
//   init() {
//     if (this.props.league === 'nba') {
//       getNbaGameDetails(this.props.date, this.props.game.id)
//         .then((currentDetails) => {
//           this.setState({ details: currentDetails.sports_content.game })
//         })
//     }
//   }
//   render() {
//     return <Game showDetails={this.showDetails} {...this.state} {...this.props} />
//   }
// }
//
// export default GameContainer
