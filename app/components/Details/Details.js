import React, { PropTypes } from 'react'
import { BoxScore, Matchup, PreGameInfo, MidGameInfo, PostGameInfo } from 'components'
import { mlbMatchupProps, nbaMatchupProps, nhlMatchupProps } from 'helpers/props/matchupProps'
import { nbaBoxScoreProps, nhlBoxScoreProps } from 'helpers/props/boxScoreProps'
import { detailsContainer } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired
}

export default function Details(props) {
  if (props.league === 'mlb') return <MlbDetails {...props} />
  if (props.league === 'nba') return <NbaDetails {...props} />
  if (props.league === 'nhl') return <NhlDetails {...props} />
  return <h1>{'i hope this doesn\'t run'}</h1>
}

Details.propTypes = propTypes

function NbaDetails({ game, date, league }) {
  const matchupProps = nbaMatchupProps(game, date)
  const boxScoreProps = nbaBoxScoreProps(game, league)
  return (
    <div className={detailsContainer}>
      <Matchup {...matchupProps} />
      <BoxScore {...boxScoreProps} />
    </div>
  )
}



function NhlDetails({ game, date, league }) {
  const matchupProps = nhlMatchupProps(game, date)
  const boxScoreProps = nhlBoxScoreProps(game, league)
  return (
    <div className={detailsContainer}>
      <Matchup {...matchupProps} />
      <BoxScore {...boxScoreProps} />
    </div>
  )
}




function MlbDetails({ game, date, league, expanded }) {
  const matchupProps = mlbMatchupProps(game, date)
  return (
    <div className={detailsContainer}>
      <Matchup {...matchupProps} />
    </div>
  )
}
