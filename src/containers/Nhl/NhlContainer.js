import React, { Component } from 'react'
import { League } from 'components'
import { getTodaysDate, isValidDate } from 'helpers/utils'
import { updatePageInfo } from 'config/metadata'
import { getNhlScores } from 'helpers/api'

class NhlContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      isValid: false,
      isError: false,
      scores: {},
      year: '',
      date: '',
      today: ''
    }
  }
  componentDidMount() {
    const pageInfo = {
      title: `${this.props.league.toUpperCase()} scores · uxscoreboard`,
      desc: `live ${this.props.league.toUpperCase()} scores · uxscoreboard`
    }
    updatePageInfo(pageInfo)
    this.setState({ today: getTodaysDate() }, () => {
      this.makeRequest(this.props.routeParams.date)
    })
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.date)
  }
  makeRequest(dt = this.state.today) {
    if (isValidDate(dt)) {
      this.setState({ isValid: true })
    }
    getNhlScores(dt)
      .then(currentScores => {
        this.setState({
          isLoading: false,
          scores: currentScores,
          year: '20162017',
          date: dt
        })
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isError: true,
          date: dt
        })
        throw new Error(error)
      })
  }
  render() {
    return <League {...this.state} league={this.props.league} />
  }
}

NhlContainer.defaultProps = { league: 'nhl' }
export default NhlContainer
