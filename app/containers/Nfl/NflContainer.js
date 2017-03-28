import React, { Component } from 'react'
import { Nfl } from 'components'
import { getTodaysDate, isValidDate, isInSeason } from 'helpers/utils'
import { getNflScores } from 'helpers/api'
import { parseString } from 'xml2js'
// const parse = require('xml2js').parseString

class NflContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      isValid: false,
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
          console.log(result)
          this.setState({
            isLoading: false,
            scores: result.ss.gms[0],
            year: result.ss.gms[0]['$'].y,
            date: dt
          })
        })
      })
      .catch((error) =>  {
        this.setState({
          isLoading: false,
          date: dt
        })
        throw new Error(error)
      })
  }
  render() {
    return <Nfl {...this.state} />
  }
}

export default NflContainer
