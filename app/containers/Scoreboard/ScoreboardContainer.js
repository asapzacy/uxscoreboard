import React, { Component } from 'react'
import { Scoreboard } from 'components'

import { getNbaGameDetails } from 'helpers/api'

class ScoreboardContainer extends Component {
  constructor() {
    super()
    this.state = {
      isPlayingToday: false,
      gamesList: {},
      gameKey: ''
    }
  }
  componentDidMount() {
    this.init()
  }
  init() {
    if (this.props.league === 'nhl') {
      const isPlaying = Boolean(this.props.scores.dates.length)
      this.setState({
        isPlayingToday: isPlaying,
        gamesList: isPlaying ? this.props.scores.dates[0].games : '',
        gameKey: 'gamePk'
      })
    }
  }
  render() {
    return <Scoreboard  {...this.state} {...this.props} />
  }
}

export default ScoreboardContainer
