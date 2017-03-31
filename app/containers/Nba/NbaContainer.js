import React, { Component } from 'react'
import { Nba } from 'components'
import { getTodaysDate, isValidDate, isInSeason } from 'helpers/utils'
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
    this.init()
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.date)
  }
  init() {
    ref.once('value', (snapshot) => {
      this.setState({
        cache: snapshot.val().nba.scores,
        today: getTodaysDate()
      }, () => this.makeRequest(this.props.routeParams.date))
    })
  }
  makeRequest(dt = this.state.today) {
    if (isValidDate(dt)) {
      this.setState({ isValid: true })
    }
    const currentScores = this.state.cache[dt] && this.state.cache[dt]
    if (dt !== this.state.today && true) {
      console.log('go')
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
  saveScores() {
    ref.child(`nba/scores/${this.state.date}`)
      .set(this.state.scores)
      .then(() => this.setState({ isSaved: true }))
    console.log(`nba scores - ${this.state.date} - saved to firebase. . . `)
  }
  render() {
    return <Nba {...this.state} />
  }
}

export default NbaContainer
