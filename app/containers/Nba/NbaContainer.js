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
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.date !== nextState.date
  }
  makeRequest(dt = this.state.today) {
    if (isValidDate(dt)) {
      this.setState({ isValid: true })
    }
    const currentScores = this.state.cache[dt]
    if (dt !== this.state.today && currentScores) {
      this.setState({
        isLoading: false,
        scores: currentScores,
        year: currentScores.sports_content.sports_meta.season_meta.season_year,
        date: dt
      })
    } else {
      getNbaScores(dt)
        .then((currentScores) => {
          this.setState({
            isLoading: false,
            scores: currentScores,
            year: currentScores.sports_content.sports_meta.season_meta.season_year,
            date: dt
          }, () => this.saveScores())
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
      this.setState({ cache: snapshot.val().nba.scores })
    })
  }
  saveScores() {
    ref.child(`nba/scores/${this.state.date}`)
      .set(this.state.scores)
      .then(() => console.log(`nba scores updated.. `))
  }
  render() {
    return <League {...this.state} league={this.props.league} />
  }
}

NbaContainer.defaultProps = { league: 'nba' }

export default NbaContainer
