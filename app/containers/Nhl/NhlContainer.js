import React, { Component } from 'react'
import { Nhl } from 'components'
import { NotFoundContainer } from 'containers'
import { getNhlScores } from 'helpers/api'

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
    getNhlScores(dt)
      .then((currentScores) => {
        this.setState({
          isLoading: false,
          scores: currentScores.dates[0],
          date: this.props.routeParams.date || '20161012'
        })
      })
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
