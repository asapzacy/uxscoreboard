import React, { Component } from 'react'
import { Scoreboard } from 'components'
import { seasons } from 'data/league_dates'
import { checkDay, formatLastUpdatedString } from 'helpers/utils'

class ScoreboardContainer extends Component {
  constructor() {
    super()
    this.state = {
      lastUpdated: 0,
      bgImg: false,
      seasonState: {
        isPreseason: false,
        isSeason: false,
        isAllStar: false,
        isPlayoffs: false,
        isFinals: false
      },
      direction: {
        enter: '',
        leave: ''
      }
    }
  }
  componentDidMount() {
    this.updateTime()
    this.checkSeason(this.props.date)
  }
  componentWillReceiveProps(nextProps) {
    this.updateTime()
    this.checkSeason(nextProps.date)
    this.updateDirection(this.props.date, nextProps.date)
  }
  updateTime() {
    this.setState({ lastUpdated: formatLastUpdatedString() })
  }
  updateDirection(oldDate, newDate) {
    let enter
    let leave
    if (oldDate > newDate) {
      enter = 'Left'
      leave = 'Right'
    } else if (oldDate < newDate) {
      enter = 'Right'
      leave = 'Left'
    }
    this.setState({
      direction: { enter, leave }
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
    }, () => this.updateBgImg())
  }
  updateBgImg() {
    let img = ''
    if (this.state.seasonState.isPlayoffs) {
      if (this.state.seasonState.isFinals) {
        img = `url(/assets/img/${this.props.league}/other/finals.svg)`
      } else {
        img = `url(/assets/img/${this.props.league}/other/playoffs.svg)`
      }
    }
    if (this.state.seasonState.isAllStar) {
      img = `url(/assets/img/${this.props.league}/other/all-star-game.svg)`
    }
    this.setState({ bgImg: img })
  }
  render() {
    return <Scoreboard {...this.state} {...this.props} />
  }
}

export default ScoreboardContainer
