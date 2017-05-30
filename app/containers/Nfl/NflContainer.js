import React, { Component } from 'react'
import { League } from 'components'
import { getTodaysDate, isValidDate } from 'helpers/utils'
import { getNflScores } from 'helpers/api'
import { parseString } from 'xml2js'

class NflContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      isValid: false,
      isError: false,
      scores: {},
      year: '',
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
    getNflScores(dt)
      .then((currentScores) => {
        parseString(currentScores, (err, result) => {
          this.setState({
            isLoading: false,
            scores: result.ss.gms[0],
            year: result.ss.gms[0].$.y,
            date: dt
          })
        })
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
  render() {
    return <League {...this.state} league={this.props.league} />
  }
}

NflContainer.defaultProps = { league: 'nfl' }

export default NflContainer
