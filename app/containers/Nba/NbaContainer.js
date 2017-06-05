import React, { Component } from 'react'
import { League } from 'components'
import { getTodaysDate, isValidDate } from 'helpers/utils'
import { getNbaScores } from 'helpers/api'
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
    this.setState({ today: getTodaysDate()  }, () => {
      this.makeRequest(this.props.routeParams.date)
      this.getCache()
    })
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.date)
  }
  makeRequest(dt = this.state.today) {
    if (isValidDate(dt)) {
      this.setState({ isValid: true })
    }
    if (this.state.cache[dt] && dt !== this.state.today) {
      const data = this.state.cache[dt]
      this.setState({
        isLoading: false,
        scores: data.games || [],
        year: data.year,
        date: dt
      })
    } else {
      getNbaScores(dt)
        .then((data) => {
          this.setState({
            isLoading: false,
            scores: data.games,
            year: data.year,
            date: dt
          }, () => this.saveScores(data))
        })
        .catch((error) =>  {
          this.setState({
            isLoading: false,
            isError: true,
            date: dt
          })
          throw new Error(error)
        })
    }
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
  saveScores(data) {
    ref.child(`nba/scores/${this.state.date}`)
      .set(data)
      .then(() => console.log(`nba scores updated.. `))
      .then(() => this.getCache())
  }
  render() {
    return <League {...this.state} league={this.props.league} />
  }
}

NbaContainer.defaultProps = { league: 'nba' }

export default NbaContainer
