import React, { Component } from 'react'
import { Scoreboard } from 'components'
import { seasons } from 'helpers/seasons'

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
    const seasonDates = seasons[this.props.league].seasons[this.props.season]
    this.checkDates(this.props.date, seasonDates)
  }
  componentWillReceiveProps(nextProps) {
    const seasonDates = seasons[this.props.league].seasons[this.props.season]
    this.checkDates(nextProps.date, seasonDates)
   }
  checkDates(day, dates) {
    const checkDay = (day, start, end) => (day >= start) && (day <= end)
    this.setState({
      isPreseason: checkDay(day, dates.preseason[0], dates.preseason[1]),
      isSeason: checkDay(day, dates.season[0], dates.season[1]),
      isAllStar: checkDay(day, dates.allstar[0], dates.allstar[1]),
      isPlayoffs: checkDay(day, dates.playoffs[0], dates.playoffs[1]),
      isFinals: checkDay(day, dates.finals[0], dates.finals[1])
    })
  }
  render() {
    return <Scoreboard  {...this.state} {...this.props} />
  }
}

export default ScoreboardContainer
