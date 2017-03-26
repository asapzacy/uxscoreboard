import React, { Component } from 'react'
import { Nba } from 'components'
import { getTodaysDate, isValidDate, isInSeason } from 'helpers/utils'
import { getNbaScores } from 'helpers/api'

class NbaContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      isValid: false,
      scores: {},
      year: '',
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
    console.log('run')
    this.makeRequest(nextProps.routeParams.date)
  }
  makeRequest(dt = this.state.today) {
    if (isValidDate(dt)) {
      this.setState({ isValid: true })
    }
    getNbaScores(dt)
      .then((currentScores) => {
        this.setState({
          isLoading: false,
          scores: currentScores,
          year: currentScores.sports_content.sports_meta.season_meta.season_year,
          date: dt
        })
      })
      .catch((error) =>  {
        this.setState({
          isLoading: false,
          date: dt
        })
        throw new Error(error)
      })
  }
  render() {
    return <Nba {...this.state} />
  }
}

export default NbaContainer
