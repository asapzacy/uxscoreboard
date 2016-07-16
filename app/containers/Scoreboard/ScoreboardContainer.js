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
    let y = formatDateUrl(x)
    this.setState({
      date: y
    })
    this.makeRequest(y)
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.date)
  }
  makeRequest(date) {
    getMlbScores(date)
      .then((currentScores) => {
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
