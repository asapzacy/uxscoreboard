import React, { Component } from 'react'
import { Nfl, Game } from 'components'
import { formatDateUrl, getNflScores } from 'helpers/api'

class NflContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      scores: ''
    }
  }
  componentDidMount() {
    this.makeRequest(this.props.routeParams.date)
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.date)
  }
  makeRequest() {
    getNflScores()
      .then((currentScores) => {
        this.setState({
          isLoading: false,
          scores: currentScores
        })
      })
  }
  render() {
    return (
      <div>
        {this.state.scores
          ? <Nfl
              isLoading={this.state.isLoading}
              scores={this.state.scores}/>
          : null}
      </div>
    )
  }
}

export default NflContainer
