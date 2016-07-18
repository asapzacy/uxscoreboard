import React, { Component } from 'react'
import { Scoreboard, Game } from 'components'
import { formatDateUrl, getMlbScores } from 'helpers/api'

class ScoreboardContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      scores: {},
      date: ''
    }
  }
  componentDidMount() {
    let x = new Date()
    let y = formatDateUrl(new Date())
    this.setState({
      date: this.props.routeParams.date || y
    })
    this.makeRequest(this.props.routeParams.date)
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.date)
  }
  cleanGameData(scores) {
    if (scores.game !== undefined) {
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
    })
  }
  }
  makeRequest(date) {
    getMlbScores(date)
      .then((currentScores) => {
        this.cleanGameData(currentScores.data.games)
        this.setState({
          isLoading: false,
          scores: currentScores.data.games
        })
      })
  }
  handleClick(day) {
    this.context.router.push({
      pathname: '/scores/' + this.props.routeParams.date,
      state: {
        day
      }
    })
  }
  render() {
    return (
      <div>
        {this.state.scores
          ? <Scoreboard
              isLoading={this.state.isLoading}
              scores={this.state.scores}
              date={this.props.routeParams.date ? this.props.routeParams.date : this.state.date}
              handleClick={(day) => this.handleClick(day)}
            />
          : null
        }
      </div>
    )
  }
}


export default ScoreboardContainer
