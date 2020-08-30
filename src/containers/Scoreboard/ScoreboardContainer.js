import React from 'react'
import { Scoreboard } from 'components'
import seasons from 'data/season-dates'
import { checkDay, formatLastUpdatedString } from 'helpers/utils'

class ScoreboardContainer extends React.Component {
  state = {
    lastUpdatedStr: '',
    bgImg: '',
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

  componentDidMount() {
    this.updateTime()
    this.checkSeason(this.props.date || this.props.week)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date) {
      this.updateTime()
      this.checkSeason(this.props.date || this.props.week)
      this.updateDirection(prevProps.date, this.props.date)
    }

    if (prevProps.lastUpdated !== this.props.lastUpdated) {
      this.updateTime()
    }
  }

  updateTime() {
    this.setState({ lastUpdatedStr: formatLastUpdatedString() })
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
    if (
      this.props.league !== 'nba' &&
      this.props.league !== 'nhl' &&
      this.props.league !== 'nfl'
    ) {
      const dates = seasons[this.props.league][this.props.year]
      this.setState(
        {
          seasonState: {
            isPreseason: checkDay(
              day,
              dates.preseason.start,
              dates.preseason.end
            ),
            isSeason: checkDay(day, dates.season.start, dates.season.end),
            isAllStar: checkDay(
              day,
              dates.season.allstar.start,
              dates.season.allstar.end
            ),
            isPlayoffs: checkDay(day, dates.playoffs.start, dates.playoffs.end),
            isFinals: checkDay(
              day,
              dates.playoffs.finals.start,
              dates.playoffs.finals.end
            )
          }
        },
        () => this.updateBgImg()
      )
    }
  }

  updateBgImg() {
    let img = ''
    if (this.state.seasonState.isPlayoffs) {
      if (this.state.seasonState.isFinals) {
        img = `url(/assets/static/img/${this.props.league}/other/finals.svg)`
      } else {
        img = `url(/assets/static/img/${this.props.league}/other/playoffs.svg)`
      }
    }
    if (this.state.seasonState.isAllStar) {
      img = `url(/assets/static/img/${
        this.props.league
      }/other/all-star-game.svg)`
    }
    this.setState({ bgImg: img })
  }

  render() {
    return <Scoreboard {...this.state} {...this.props} />
  }
}

export default ScoreboardContainer
