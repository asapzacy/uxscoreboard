import React, { Component } from 'react'
import { Team } from 'components'
import { shortenTeamName } from 'helpers/utils'

class TeamContainer extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      code: '',
      filetype: '',
      ws: '',
      ls: '',
      ts: '',
      score: ''
    }
  }
  componentDidMount() {
    this.init()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.setUpMlb(nextProps) })
  }
  init() {
    switch (this.props.league) {
      case 'mlb': this.setState({ ...this.setUpMlb(this.props) })
    }
  }
  setUpMlb(props) {
    const { game, side, league } = props
    const hasStarted = game.status.codedGameState != 'P'
      && (game.status.abstractGameCode === 'L' || game.status.codedGameState === 'I' ||
          game.status.statusCode === 'F' || game.status.statusCode === 'O')
    return {
      name: shortenTeamName(game.teams[side].team.teamName),
      code: game.teams[side].team.fileCode,
      filetype: false ? 'png' : 'svg',
      ws: String(game.teams[side].leagueRecord.wins),
      ls: String(game.teams[side].leagueRecord.losses),
      score: hasStarted && String(game.teams[side].score),
      league
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState)
    if (this.state.scores !== nextState.scores)
      return true
    return false
  }
  render() {
    console.log('rendered')
    return <Team {...this.state} />
  }
}

export default TeamContainer
