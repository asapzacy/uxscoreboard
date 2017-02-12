import React, { Component } from 'react'
import { Scoreboard } from 'components'
import { seasons } from 'helpers/seasons'

class ScoreboardContainer extends Component {
  constructor() {
    super()
    this.state = {
      isPreSeason: false,
      isRegularSeason: false,
      isAllStar: false,
      isPlayoffs: false,
      isFinals: false
    }
  }
  componentWillReceiveProps() {
    const seasonDates = seasons[this.props.league].seasons[this.props.season]
    this.checkDates(seasonDates)
  }
  checkDates(dates) {
    const checkDay = (start, end) => start <= this.props.date && this.props.date <= end
    this.setState({
      isPreSeason: checkDay(dates.preseason[0], dates.preseason[1]),
      isRegularSeason: checkDay(dates.season[0], dates.season[1]),
      isAllStar: checkDay(dates.allstar[0], dates.allstar[1]),
      isPlayoffs: checkDay(dates.playoffs[0], dates.playoffs[1]),
      isFinals: checkDay(dates.finals[0], dates.finals[1])
    })
  }
  render() {
    return <Scoreboard  {...this.state} {...this.props} />
  }
}

export default ScoreboardContainer
