import React, { Component } from 'react'
import { Standings } from 'components'
import { getMlbStandings } from 'helpers/api'

class StandingsContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      standings: {}
    }
  }
  componentDidMount() {
    this.makeRequest()
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps)
  }
  makeRequest() {
    getMlbStandings()
      .then((currentStandings) => {
        this.setState({
          isLoading: false,
          standings: currentStandings.standings_schedule_date.standings_all_date_rptr.standings_all_date
        })
      })
  }
  render() {
    return (
      <Standings
        isLoading={this.state.isLoading}
        standings={this.state.standings}
      />
    )
  }
}

export default StandingsContainer
