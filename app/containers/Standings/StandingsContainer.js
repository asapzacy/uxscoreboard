import React, { Component } from 'react'
import { Standings } from 'components'
import { getMlbStandings } from 'helpers/api'

class StandingsContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      standings: {},
      filter: ''
    }
  }
  componentDidMount() {
    let x = 'division'
    this.setState({
      filter: this.props.routeParams.filter || x
    })
    this.makeRequest(this.props.routeParams.filter)
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.filter)
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
  filterStandings(filterBy) {
    this.context.router.push({
      pathname: '/standings/' + this.props.routeParams.filter,
      state: {
        filterBy
      }
    })
  }
  render() {
    return (
      <Standings
        isLoading={this.state.isLoading}
        standings={this.state.standings}
        filter={this.props.routeParams.filter ? this.props.routeParams.filter : this.state.filter}
        handleClick={(x) => this.handleClick(x)}
      />
    )
  }
}

export default StandingsContainer
