import React, { Component } from 'react'
import { Nhl, Game } from 'components'
import { formatDateUrl, getMlbScores } from 'helpers/api'

class NhlContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      scores: {},
      date: ''
    }
  }
  componentDidMount() {
    this.makeRequest(this.props.routeParams.date)
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.date)
  }
  makeRequest(dt) {
    getMlbScores(dt)
      .then((currentScores) => {
        const today = formatDateUrl()
        this.cleanGameData(currentScores.data.games)
        this.setState({
          isLoading: false,
          scores: currentScores.data.games,
          date: this.props.routeParams.date || today
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
        {this.state.scores
          ? <Nhl
              isLoading={this.state.isLoading}
              scores={this.state.scores}
              date={this.state.date}
            />
          : null
        }
      </div>
    )
  }
}


export default NhlContainer
