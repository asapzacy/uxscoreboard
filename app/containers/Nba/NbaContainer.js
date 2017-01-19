import React, { Component } from 'react'
import { Nba } from 'components'
import { getTodaysDate, isValidDate, isInSeason } from 'helpers/utils'
import { getNbaScores } from 'helpers/api'
import { seasons } from 'helpers/seasons'

class NbaContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      isValid: false,
      scores: {},
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
    getNbaScores(dt)
      .then((currentScores) => {
        const games = currentScores.sports_content.games.game
        console.log(games)
        this.cleanGameData(games)
        console.log(games)
        this.setState({
          isLoading: false,
          scores: currentScores,
          date: dt
        })
      })
      .catch((error) =>  {
        this.setState({
          isLoading: false,
          date: dt
        })
      })
  }
  cleanGameData(scores) {
    if (scores.game !== undefined) {
      scores.game.map((game) => {
        if (game.visitor.linescores === undefined) {
          game.visitor.linescores = {
            period: { 0: { score: null },
                      1: { score: null },
                      2: { score: null },
                      3: { score: null }
                    }
          }
        }
        if (game.home.linescores === undefined) {
          game.home.linescores = {
            period: { 0: { score: null },
                      1: { score: null },
                      2: { score: null },
                      3: { score: null }
                    }
          }
        }
      })
    }
  }
  render() {
    return <Nba {...this.state} />
  }
}

export default NbaContainer
