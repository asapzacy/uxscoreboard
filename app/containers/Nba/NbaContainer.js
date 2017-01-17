import React, { Component } from 'react'
import { Nba } from 'components'
import { getNbaScores } from 'helpers/api'

class NbaContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      scores: {},
      date: '20160116'
    }
  }
  componentDidMount() {
    this.makeRequest(this.props.routeParams.date)
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.date)
  }
  makeRequest(dt='20160116') {
    getNbaScores(dt)
      .then(currentScores => console.log(currentScores))
      // .then((currentScores) => {
      //   this.cleanGameData(currentScores)
      //   this.setState({
      //     isLoading: false,
      //     scores: currentScores,
      //     date: this.props.routeParams.date || '20161025'
      //   })
      // })
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
    return (
      <div>
        {this.state.scores
          ? <Nba
              isLoading={this.state.isLoading}
              scores={this.state.scores}
              date={this.state.date}/>
          : null}
      </div>
    )
  }
}

export default NbaContainer
