import React, { Component } from 'react'
import { Mlb } from 'components'
import { getTodaysDate, isValidDate, isInSeason } from 'helpers/utils'
import { getMlbScores } from 'helpers/api'
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
      const games = currentScores
      this.setState({
        isLoading: false,
        scores: games,
        year: games[0].season,
        date: dt
      })
    } else {
      getMlbScores(dt)
        .then((currentScores) => {
          const games = currentScores.dates[0].games
          this.setState({
            isLoading: false,
            scores: games,
            year: games[0].season,
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
      this.setState({ cache: snapshot.val().mlb.scores })
    })
  }
  saveScores() {
    ref.child(`mlb/scores/${this.state.date}`)
      .set(this.state.scores)
      .then(() => console.log(`mlb scores - ${this.state.date} - saved to firebase. . . `))
  }
  render() {
    return <Mlb {...this.state} />
  }
}

export default MlbContainer
