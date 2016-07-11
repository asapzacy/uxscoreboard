import React, { Component } from 'react'
import { Scoreboard, Game } from 'components'
import { getMlbScores } from 'helpers/api'

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
    this.makeRequest()
  }
  makeRequest() {
    getMlbScores()
      .then((currentScores) => {
        this.setState({
          isLoading: false,
          scores: currentScores.data.games,
        })
      })
  }
  render() {
    return (
      <div>
        {this.state.scores
          ? <Scoreboard
              isLoading={this.state.isLoading}
              scores={this.state.scores}
              date={this.state.scores.date}
            />
          : null
        }
      </div>
    )
  }
}


export default ScoreboardContainer
