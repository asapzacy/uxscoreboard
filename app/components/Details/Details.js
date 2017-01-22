import React, { PropTypes } from 'react'
import { BoxScore, Matchup, PreGameInfo, MidGameInfo, PostGameInfo } from 'components'
import { mlbMatchupProps, nbaMatchupProps, nhlMatchupProps } from 'helpers/props/matchupProps'
import { nhlBoxScoreProps } from 'helpers/props/gameProps'
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

function NbaDetails({ game, date }) {
  const matchupProps = nbaMatchupProps(game, date)
  return (
    <div className={detailsContainer}>
      <Matchup {...matchupProps} />
    </div>
  )
}



function NhlDetails({ game, date }) {
  const matchupProps = nhlMatchupProps(game, date)
  const boxScoreProps = nhlBoxScoreProps(game)
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
