import React, { Component } from 'react'
import { League } from 'components'
import { getTodaysDate, isValidDate } from 'helpers/utils'
import { getNbaScores } from 'helpers/api'
import { seasons } from 'data/league_dates'
import { updatePageInfo } from 'config/metadata'
import { ref } from 'config/firebase'

class NbaContainer extends Component {
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
  }
  componentDidMount() {
    const pageInfo = {
      title: `${this.props.league.toUpperCase()} scores · uxscoreboard`,
      desc: `live ${this.props.league.toUpperCase()} scores · uxscoreboard`
    }
    updatePageInfo(pageInfo)
    this.setState({ today: getTodaysDate()  }, () => {
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
  async makeRequest(dt = this.state.today) {
    if (isValidDate(dt)) {
      this.setState({ isValid: true })
    }
    if (this.state.cache[dt] && dt !== this.state.today) {
      const data = this.state.cache[dt]
      const { games } = await data
      this.setState({
        isLoading: false,
        scores: data.games || [],
        year: data.year,
        date: dt
      }, () => this.saveScores())
    } else {
      getNbaScores(dt)
        .then((data) => {
          this.setState({
            isLoading: false,
            scores: data.games,
            year: data.year,
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
        .then(() => this.saveScores())
        .then(() => this.refreshScores(dt, 30))
    }
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
      if (snapshot.hasChild('nba')) {
        this.setState({
          cache: snapshot.val().nba.scores
        })
      }
    })
  }
  saveScores() {
    ref.child(`nba/scores/${this.state.date}`)
      .set(this.state.scores)
      .then(() => console.log(`nba scores updated.. `))
      .then(() => this.getCache())
  }
  render() {
    return <League {...this.state} league={this.props.league} />
  }
}

NbaContainer.defaultProps = { league: 'nba' }

export default NbaContainer
