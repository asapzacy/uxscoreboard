import React, { Component } from 'react'
import { League } from 'components'
import { getTodaysDate, isValidDate } from 'utils/helpers'
import { getMlbScores } from 'utils/api'
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
      title: `${this.props.league.toUpperCase()} scores · uxscoreboard`,
      desc: `live ${this.props.league.toUpperCase()} scores · uxscoreboard`
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
  makeRequest(dt = '20171101') {
    if (isValidDate(dt)) {
      this.setState({ isValid: true })
    }
    getMlbScores(dt)
      .then((currentScores) => {
        const gamedayDetails = currentScores.dates[0]
        const scores = gamedayDetails !== undefined ? gamedayDetails.games : []
        const year = scores[0] ? scores[0].season : (this.state.year || dt.slice(0, 4))
        this.setState({
          date: dt,
          scores,
          year
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
      .then(() => this.saveScores())
      .then(() => {
        if (dt === this.state.today) {
          this.refreshScores(dt, 30)
        }
      })
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
      if (snapshot.hasChild('mlb')) {
        this.setState({
          cache: snapshot.val().mlb.scores
        })
      }
    })
  }
  saveScores() {
    ref.child(`mlb/scores/${this.state.date}`)
      .set(this.state.scores)
      .then(() => console.log(`mlb scores updated.. `))
      .then(() => this.getCache())
  }
  render() {
    return <League {...this.state} league={this.props.league} />
  }
}

MlbContainer.defaultProps = { league: 'mlb' }

export default MlbContainer
