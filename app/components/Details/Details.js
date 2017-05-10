import React from 'react'
import { Matchup, PanelMenu, BoxScore, Stats, Diamond, Leaders, UpdateTime } from 'components'
import { mlbMatchupProps, nbaMatchupProps, nhlMatchupProps } from '../Matchup/props'
import { mlbBoxScoreProps, nbaBoxScoreProps, nhlBoxScoreProps } from '../BoxScore/props'
import { mlbDiamondProps } from '../Diamond/props'
import { nbaStatsProps } from '../Stats/props'
import { detailsContainer } from './styles.css'

export default function Details(props) {
  if (props.league === 'mlb') return <MlbDetails {...props} />
  if (props.league === 'nba') return <NbaDetails {...props} />
  if (props.league === 'nfl') return <NflDetails {...props} />
  if (props.league === 'nhl') return <NhlDetails {...props} />
}


const MlbDetails = ({ game, date, league, panel, switchPanel, lastUpdated }) => (
  <section className={detailsContainer}>
    <Matchup {...mlbMatchupProps(game, date)} />
    <PanelMenu panel={panel} switchPanel={switchPanel} />
    { panel === 'boxScore' &&
      <span>
        <BoxScore {...mlbBoxScoreProps(game, league)} />
        <Diamond {...mlbDiamondProps(game)} />
      </span>
    }
    <UpdateTime lastUpdated={lastUpdated} />
  </section>
)

const NbaDetails = ({ game, date, league, panel, switchPanel, lastUpdated }) => (
  <section className={detailsContainer}>
    <Matchup {...nbaMatchupProps(game, date)} />
    <PanelMenu panel={panel} switchPanel={switchPanel} />
    { panel === 'boxScore' && <BoxScore {...nbaBoxScoreProps(game, league)} /> }
    { panel === 'teamStats' && <Stats {...nbaStatsProps(game)} /> }
    { panel === 'leaders' && <Leaders /> }
    <UpdateTime lastUpdated={lastUpdated} />
  </section>
)


const s = {
  padding: '6% 12%',
  fontWeight: 700,
  letterSpacing: 0,
}
const NflDetails = ({ lastUpdated }) => (
  <section className={detailsContainer}>
    <h4 style={s}>{'coming soon'}</h4>
    <UpdateTime lastUpdated={lastUpdated} />
  </section>
)


const NhlDetails = ({ game, date, league, lastUpdated }) => (
  <section className={detailsContainer}>
    <Matchup {...nhlMatchupProps(game, date)} />
    <BoxScore {...nhlBoxScoreProps(game, league)} />
    <UpdateTime lastUpdated={lastUpdated} />
  </section>
)
