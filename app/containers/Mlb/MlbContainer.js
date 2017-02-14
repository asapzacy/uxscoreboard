import React, { Component } from 'react'
import { Mlb } from 'components'
import { getTodaysDate, isValidDate, isInSeason } from 'helpers/utils'
import { getMlbScores } from 'helpers/api'

class MlbContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      isValid: false,
      scores: {},
      year: '',
      date: '',
      today: ''
    }
  }
  componentDidMount() {
    this.setState({ today: getTodaysDate() }, () => {
      this.makeRequest(this.props.routeParams.date)
    })
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.date)
  }
  makeRequest(dt = this.state.today) {
    if (isValidDate(dt)) {
      this.setState({ isValid: true })
    }
    getMlbScores(dt)
      .then((currentScores) => {
        const games = currentScores.data.games
        this.cleanGameData(games)
        this.setState({
          isLoading: false,
          scores: games,
          year: currentScores.data.games.year,
          date: dt
        })
      })
      .catch((error) =>  {
        this.setState({
          isLoading: false,
          date: dt
        })
        throw new Error(error)
      })
  }
  cleanGameData(scores) {
    if (scores.game !== undefined) {
      if (scores.game[0] === undefined) {
        if (scores.game.linescore === undefined) {
          scores.game.linescore = {
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
    return <Mlb {...this.state} />
  }
}

export default MlbContainer
