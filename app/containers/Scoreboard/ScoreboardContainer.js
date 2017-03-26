import React, { Component } from 'react'
import { Scoreboard } from 'components'
import { seasons } from 'helpers/seasons'
import { checkDay } from 'helpers/utils'

class ScoreboardContainer extends Component {
  constructor() {
    super()
    this.state = {
      isPreseason: false,
      isSeason: false,
      isAllStar: false,
      isPlayoffs: false,
      isFinals: false
    }
  }
  componentDidMount() {
    this.checkSeason(this.props.date)
  }
  componentWillReceiveProps(nextProps) {
    this.checkSeason(nextProps.date)
   }
  checkSeason(day) {
    const dates = seasons[this.props.league].seasons[this.props.year]
    this.setState({
      isPreseason: checkDay(day, dates.preseason.start, dates.preseason.end),
      isSeason: checkDay(day, dates.season.start, dates.season.end),
      isAllStar: checkDay(day, dates.season.allstar.start, dates.season.allstar.end),
      isPlayoffs: checkDay(day, dates.playoffs.start, dates.playoffs.end),
      isFinals: checkDay(day, dates.playoffs.finals.start, dates.playoffs.finals.end)
    })
  }
  render() {
    return <Scoreboard seasonState={this.state} {...this.props} />
  }
}

export default ScoreboardContainer
