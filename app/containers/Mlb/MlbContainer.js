import React, { Component } from 'react'
import { Mlb } from 'components'
import { getTodaysDate, isInSeason } from 'helpers/utils'
import { getMlbScores } from 'helpers/api'
import { seasons } from 'helpers/seasons'

class MlbContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      scores: {},
      date: ''
    }
  }
  componentDidMount() {
    this.makeRequest(this.props.routeParams.date || getTodaysDate())
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.date)
  }
  makeRequest(dt) {
    dt = isInSeason(dt, seasons.mlb.start, seasons.mlb.end)
    getMlbScores(dt)
      .then((currentScores) => {
        const data = currentScores.data.games
        this.cleanGameData(data)
        this.setState({
          isLoading: false,
          scores: data,
          date: dt
        })
      })
  }
  cleanGameData(scores) {
    if (scores.game !== undefined) {
      if (scores.game[0] === undefined) {
        if (scores.game.review === undefined) {
          scores.game.review = {
            challenges_away_remaining: { null },
            challenges_home_remaining: { null }
          }
        }
        return scores.game
      }
      else {
        scores.game.map((game) => {
          if (game.linescore === undefined) {
            game.linescore = {
              r: { away: null, home: null },
              h: { away: null, home: null },
              e: { away: null, home: null },
              inning: { 0: { away: null, home: null },
                        1: { away: null, home: null },
                        2: { away: null, home: null },
                        3: { away: null, home: null },
                        4: { away: null, home: null },
                        5: { away: null, home: null },
                        6: { away: null, home: null },
                        7: { away: null, home: null },
                        8: { away: null, home: null }
                      }
            }
          }
          if (game.review === undefined) {
            game.review = {
              challenges_away_remaining: { null },
              challenges_home_remaining: { null }
            }
          }
          if (game.alerts === undefined) {
            game.alerts = {
              text: { null }
            }
          }
        })
      }
    }
  }
  render() {
    return (
      <div>
        { this.state.scores
          ? <Mlb
              isLoading={this.state.isLoading}
              scores={this.state.scores}
              date={this.state.date}
            />
          : null }
      </div>
    )
  }
}

export default MlbContainer
