import React, { Component } from 'react'
import { League } from 'components'
import { getTodaysDate, isValidDate } from 'helpers/utils'
import { getNflScores } from 'helpers/api'

class NflContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      isValid: true,
      isError: false,
      scores: {},
      year: '',
      today: '',
      week: 1
    }
  }
  componentDidMount() {
    this.setState({ today: getTodaysDate() }, () => {
      this.makeRequest(this.props.routeParams.week)
    })
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.week)
  }
  makeRequest(week = this.state.week) {
    getNflScores(week)
      .then((data) => {
        this.setState({
          isLoading: false,
          scores: data.games,
          year: data.year
        })
      })
      .catch((error) =>  {
        this.setState({
          isLoading: false,
          isError: true
        })
        throw new Error(error)
      })
  }
  render() {
    return <League {...this.state} league={this.props.league} />
  }
}

NflContainer.defaultProps = { league: 'nfl' }

export default NflContainer
