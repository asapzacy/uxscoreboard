import React, { Component } from 'react'
import { League } from 'components'
import { getTodaysDate, isValidDate } from 'helpers/utils'
import { getMlbScores } from 'helpers/api'
import { updatePageInfo } from 'config/metadata'
import { ref } from 'config/firebase'

class MlbContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      isValid: false,
      isError: false,
      scores: {},
      cache: {},
      year: '',
      date: '',
      today: ''
    }
    this.makeRequest = this.makeRequest.bind(this)
  }
  componentDidMount() {
    const pageInfo = {
      title: `uxscoreboard | ${this.props.league.toUpperCase()}`,
      desc: `uxscoreboard | live ${this.props.league.toUpperCase()} scores`
    }
    updatePageInfo(pageInfo)
    this.setState({ today: getTodaysDate() }, () => {
      this.makeRequest(this.props.routeParams.date)
      this.getCache()
    })
  }
  componentWillReceiveProps(nextProps) {
    clearTimeout(this.refreshId)
    this.makeRequest(nextProps.routeParams.date)
  }
  componentWillUnmount() {
    clearTimeout(this.delayId)
    clearTimeout(this.refreshId)
  }
  makeRequest(dt = this.state.today) {
    if (isValidDate(dt)) {
      this.setState({ isValid: true })
    }
    getMlbScores(dt)
      .then((currentScores) => {
        const games = currentScores.dates[0].games
        this.setState({
          scores: games,
          year: games[0].season,
          date: dt
        }, () => this.delay())
      })
      .catch((error) =>  {
        this.setState({
          isLoading: false,
          isError: true,
          date: dt
        })
        throw new Error(error)
      })
      .then(() => this.refreshScores(dt, 30))
      .then(() => this.saveScores())
  }
  delay() {
    if (this.state.isLoading) {
      this.delayId = setTimeout(() => {
        this.setState({ isLoading: false })
      }, 960)
    }
  }
  refreshScores(dt, seconds) {
    clearTimeout(this.refreshId)
    this.refreshId = setTimeout(() => this.makeRequest(dt), seconds * 1000)
  }
  getCache() {
    ref.once('value', (snapshot) => {
      this.setState({ cache: snapshot.val().mlb.scores })
    })
  }
  saveScores() {
    ref.child(`mlb/scores/${this.state.date}`)
      .set(this.state.scores)
      .then(() => console.log(`mlb scores updated.. `))
  }
  render() {
    return <League {...this.state} league={this.props.league} />
  }
}

MlbContainer.defaultProps = { league: 'mlb' }

export default MlbContainer
