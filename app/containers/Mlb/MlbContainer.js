import React, { Component } from 'react'
import { Mlb } from 'components'
import { getTodaysDate, isValidDate } from 'helpers/utils'
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
    this.makeRequest = this.makeRequest.bind(this)
  }
  componentDidMount() {
    this.setState({ today: getTodaysDate()  }, () => {
      this.makeRequest(this.props.routeParams.date)
      this.getCache()
    })
    // setInterval(this.makeRequest, 1000)
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.date)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.date !== nextState.date
  }
  componentWillUnmount() {
    clearInterval(this.makeRequest)
  }
  makeRequest(dt = this.state.today) {
    console.log('go')
    if (isValidDate(dt)) {
      this.setState({ isValid: true })
    }
    if (dt !== this.state.today) {
      const currentScores = this.state.cache[dt]
      if (currentScores) {
        this.setState({
          isLoading: false,
          scores: currentScores,
          year: currentScores[0].season,
          date: dt
        })
      }
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
