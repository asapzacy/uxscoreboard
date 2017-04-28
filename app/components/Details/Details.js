import React from 'react'
import { Matchup, PanelMenu, BoxScore, Stats, Diamond, Leaders } from 'components'
import { mlbMatchupProps, nbaMatchupProps, nhlMatchupProps } from '../Matchup/props'
import { mlbBoxScoreProps, nbaBoxScoreProps, nhlBoxScoreProps } from '../BoxScore/props'
import { mlbDiamondProps } from '../Diamond/props'
import { nbaStatsProps } from 'helpers/props/statsProps'
import { detailsContainer } from './styles.css'

export default function Details(props) {
  if (props.league === 'mlb') return <MlbDetails {...props} />
  if (props.league === 'nba') return <NbaDetails {...props} />
  if (props.league === 'nfl') return <NflDetails {...props} />
  if (props.league === 'nhl') return <NhlDetails {...props} />
}


const MlbDetails = ({ game, date, league, panel, switchPanel }) => (
  <section className={detailsContainer}>
    <Matchup {...mlbMatchupProps(game, date)} />
    <PanelMenu panel={panel} switchPanel={switchPanel} />
    { panel === 'boxScore' &&
      <span>
        <BoxScore {...mlbBoxScoreProps(game, league)} />
        <Diamond {...mlbDiamondProps(game)} />
      </span>
    }
  </section>
)

const NbaDetails = ({ game, date, league, panel, switchPanel }) => (
  <section className={detailsContainer}>
    <Matchup {...nbaMatchupProps(game, date)} />
    <PanelMenu panel={panel} switchPanel={switchPanel} />
    { panel === 'boxScore' && <BoxScore {...nbaBoxScoreProps(game, league)} /> }
    { panel === 'teamStats' && <Stats {...nbaStatsProps(game)} /> }
    { panel === 'leaders' && <Leaders /> }
  </section>
)


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


const NhlDetails = ({ game, date, league }) => (
  <section className={detailsContainer}>
    <Matchup {...nhlMatchupProps(game, date)} />
    <BoxScore {...nhlBoxScoreProps(game, league)} />
  </section>
)
