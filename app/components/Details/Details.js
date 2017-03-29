import React, { PropTypes } from 'react'
import { Matchup, PanelMenu, BoxScore, Stats, Diamond, Leaders } from 'components'
import { mlbMatchupProps, nbaMatchupProps, nhlMatchupProps } from 'helpers/props/matchupProps'
import { mlbBoxScoreProps, nbaBoxScoreProps, nhlBoxScoreProps } from 'helpers/props/boxScoreProps'
import { nbaStatsProps } from 'helpers/props/statsProps'
import { detailsContainer } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired,
  panel: PropTypes.string.isRequired,
  switchPanel: PropTypes.func.isRequired
}

export default function Details(props) {
  if (props.league === 'mlb') return <MlbDetails {...props} />
  if (props.league === 'nba') return <NbaDetails {...props} />
  if (props.league === 'nfl') return <NflDetails {...props} />
  if (props.league === 'nhl') return <NhlDetails {...props} />
}

Details.propTypes = propTypes


const MlbDetails = ({ game, date, league, panel, switchPanel }) => (
  <section className={detailsContainer}>
    <Matchup {...mlbMatchupProps(game, date)} />
    <PanelMenu panel={panel} switchPanel={switchPanel} />
    { panel === 'boxScore' && <BoxScore {...mlbBoxScoreProps(game, league)} /> }
    { panel === 'boxScore' && <Diamond /> }
  </section>
)

function NbaDetails({ game, date, league, panel, switchPanel }) {
  const matchupProps = nbaMatchupProps(game, date)
  const boxScoreProps = nbaBoxScoreProps(game, league)
  const statsProps = nbaStatsProps(game)
  return (
    <section className={detailsContainer}>
      <Matchup {...matchupProps} />
      <PanelMenu panel={panel} switchPanel={switchPanel} />
      { panel === 'boxScore' && <BoxScore {...boxScoreProps} /> }
      { panel === 'teamStats' && <Stats {...statsProps} /> }
      { panel === 'leaders' && <Leaders /> }
    </section>
  )
}

const s = {
  padding: '4% 12%',
  fontWeight: 700,
  letterSpacing: 0,
}
const NflDetails = ({  }) => (
  <section className={detailsContainer}>
    <h4 style={s}>{'coming soon'}</h4>
  </section>
)


function NhlDetails({ game, date, league }) {
  const matchupProps = nhlMatchupProps(game, date)
  const boxScoreProps = nhlBoxScoreProps(game, league)
  return (
    <section className={detailsContainer}>
      <Matchup {...matchupProps} />
      <BoxScore {...boxScoreProps} />
    </section>
  )
}
