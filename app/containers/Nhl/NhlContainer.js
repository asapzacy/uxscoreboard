import React, { Component } from 'react'
import { Nhl } from 'components'
import { getTodaysDate, isValidDate } from 'helpers/utils'
import { getNhlScores } from 'helpers/api'

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
  makeRequest(dt = this.state.today) {
    if (isValidDate(dt)) {
      this.setState({ isValid: true })
    }
    getNhlScores(dt)
      .then((currentScores) => {
        this.setState({
          isLoading: false,
          scores: currentScores,
          date: dt
        })
      })
      .catch((error) =>  {
        console.log(error)
        this.setState({
          isLoading: false,
          isError: true,
          date: dt
        })
        throw new Error(error)
      })
  }
  render() {
    return <Nhl {...this.state} />
  }
}

export default NhlContainer
