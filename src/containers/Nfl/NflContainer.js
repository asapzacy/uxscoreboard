import React, { Component } from 'react'
import { League } from 'components'
import { getTodaysDate } from 'helpers/utils'
import { updatePageInfo } from 'config/metadata'
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
    const pageInfo = {
      title: `${this.props.league.toUpperCase()} scores · uxscoreboard`,
      desc: `live ${this.props.league.toUpperCase()} scores · uxscoreboard`
    }
    updatePageInfo(pageInfo)
    this.setState({ today: getTodaysDate() }, () => {
      this.makeRequest(this.props.match.params.week)
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.date !== this.props.match.params.date) {
      clearTimeout(this.refreshId)
      this.makeRequest(this.props.match.params.date)
    }
  }

  makeRequest(week = this.state.week) {
    getNflScores(week)
      .then(data => {
        this.setState({
          isLoading: false,
          scores: data.games,
          year: data.year
        })
      })
      .catch(error => {
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
