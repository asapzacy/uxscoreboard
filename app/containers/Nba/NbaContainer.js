import React, { Component } from 'react'
import { Nba, Game } from 'components'
import { formatDateUrl, getNbaScores } from 'helpers/api'

class NbaContainer extends Component {
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
    getNbaScores(dt)
      .then((currentScores) => {
        this.setState({
          isLoading: false,
          scores: currentScores.sports_content.games,
          date: this.props.routeParams.date || '20161025'
        })
      })
  }
  render() {
    return (
      <div>
        {this.state.scores
          ? <Nba
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


export default NbaContainer
