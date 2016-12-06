import React, { Component } from 'react'
import { Nhl } from 'components'
import { getTodaysDate, isValidDate, isInSeason } from 'helpers/utils'
import { getNhlScores } from 'helpers/api'
import { seasons } from 'helpers/seasons'

class NhlContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      isValid: false,
      scores: {},
      date: '',
      today: ''
    }
  }
  componentDidMount() {
    this.setState({ today: getTodaysDate() }, () => {
      this.makeRequest(this.props.routeParams.date)
    })
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.date)
  }
  makeRequest(dt=this.state.today) {
    if (isValidDate(dt)) {
      this.setState({ isValid: true })
    }
    getNhlScores(dt)
      .then((currentScores) => {
        this.setState({
          isLoading: false,
          scores: currentScores.dates[0],
          date: dt
        })
      })
      .catch((error) =>  {
        this.setState({
          isLoading: false,
          date: dt
        })
      })
  }
  render() {
    return <Nhl {...this.state} />
  }
}

export default NhlContainer
