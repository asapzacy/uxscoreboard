import React, { Component } from 'react'
import { Scoreboard, Game } from 'components'
import { getMlbScores } from 'helpers/api'

class ScoreboardContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      scores: {}
    }
  }
  componentDidMount() {
    this.makeRequest(this.props.routeParams.date)
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
  handleClick(today) {
    this.context.router.push({
      pathname: '/scores/' + this.props.routeParams.date,
      state: {
        today
      }
    })
  }
  render() {
    return (
      <div>
        {this.state.scores
          ? <Scoreboard
              date={this.props.routeParams.date}
              isLoading={this.state.isLoading}
              handleClick={(today) => this.handleClick(today)}
              scores={this.state.scores}
            />
          : null
        }
      </div>
    )
  }
}

ScoreboardContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default ScoreboardContainer
