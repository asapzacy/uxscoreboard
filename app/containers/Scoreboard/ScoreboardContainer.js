import React, { Component } from 'react'
import { Scoreboard } from 'components'
import { seasons } from 'helpers/seasons'
import { checkDay, formatDateStr } from 'helpers/utils'

class ScoreboardContainer extends Component {
  constructor() {
    super()
    this.state = {
      seasonState: {
        isPreseason: false,
        isSeason: false,
        isAllStar: false,
        isPlayoffs: false,
        isFinals: false,
      },
      direction: {
        enter: '',
        leave: ''
      }
    }
  }
  componentDidMount() {
    this.checkSeason(this.props.date)
  }
  componentWillReceiveProps(nextProps) {
    this.checkSeason(nextProps.date)
    this.checkDirection(this.props.date, nextProps.date)
  }
  checkDirection(oldDate, newDate) {
    let enterDirection
    let leaveDirection
    if (oldDate > newDate) {
      enterDirection = 'Left'
      leaveDirection = 'Right'
    } else if (oldDate < newDate) {
      enterDirection = 'Right'
      leaveDirection = 'Left'
    }
    this.setState({
      direction: {
        enter: enterDirection,
        leave: leaveDirection
      }
    })
  }
  checkSeason(day) {
    if (this.props.league === 'nhl' || this.props.league === 'nfl') {
      return
    }
    const dates = seasons[this.props.league].seasons[this.props.year]
    this.setState({
      seasonState: {
        isPreseason: checkDay(day, dates.preseason.start, dates.preseason.end),
        isSeason: checkDay(day, dates.season.start, dates.season.end),
        isAllStar: checkDay(day, dates.season.allstar.start, dates.season.allstar.end),
        isPlayoffs: checkDay(day, dates.playoffs.start, dates.playoffs.end),
        isFinals: checkDay(day, dates.playoffs.finals.start, dates.playoffs.finals.end)
      }
    })
  }
  render() {
    return <Scoreboard {...this.state} {...this.props} />
  }
}

export default ScoreboardContainer
