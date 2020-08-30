import React from 'react'
import {
  Matchup,
  PanelMenu,
  BoxScore,
  Stats,
  Diamond,
  UpdateTime
} from 'components'
import {
  mlbMatchupProps,
  nbaMatchupProps,
  nhlMatchupProps
} from '../Matchup/props'
import {
  mlbBoxScoreProps,
  nbaBoxScoreProps,
  nhlBoxScoreProps
} from '../BoxScore/props'
import { mlbDiamondProps } from '../Diamond/props'
import { nbaStatsProps } from '../Stats/props'
import s from './Details.scss'

const Details = props => {
  switch (props.league) {
    case 'mlb':
      return <MlbDetails {...props} />
    case 'nba':
      return <NbaDetails {...props} />
    case 'nfl':
      return <NflDetails {...props} />
    case 'nhl':
      return <NhlDetails {...props} />
  }
}

export default Details

const MlbDetails = ({
  game,
  date,
  league,
  panels,
  activePanel,
  switchPanel,
  lastUpdatedStr
}) => (
  <section className={s.container}>
    <Matchup {...mlbMatchupProps(game, date)} />
    <PanelMenu
      panels={panels}
      activePanel={activePanel}
      switchPanel={switchPanel}
    />
    {activePanel === 'box score' && (
      <BoxScore {...mlbBoxScoreProps(game, league)}>
        <Diamond {...mlbDiamondProps(game)} />
      </BoxScore>
    )}
    <UpdateTime lastUpdatedStr={lastUpdatedStr} />
  </section>
)

const NbaDetails = ({
  game,
  date,
  league,
  panels,
  activePanel,
  switchPanel,
  lastUpdatedStr
}) => (
  <section className={s.container}>
    <Matchup {...nbaMatchupProps(game, date)} />
    <PanelMenu
      panels={panels}
      activePanel={activePanel}
      switchPanel={switchPanel}
    />
    {activePanel === 'box score' && (
      <BoxScore {...nbaBoxScoreProps(game, league)} />
    )}
    {activePanel === 'team stats' && <Stats {...nbaStatsProps(game)} />}
    <UpdateTime lastUpdatedStr={lastUpdatedStr} />
  </section>
)

const NflDetails = ({ lastUpdatedStr }) => (
  <section className={s.container}>
    <br />
    <br />
    <br />
    <br />
    <UpdateTime lastUpdatedStr={lastUpdatedStr} />
  </section>
)

const NhlDetails = ({ game, date, league, lastUpdatedStr }) => (
  <section className={s.container}>
    <Matchup {...nhlMatchupProps(game, date)} />
    <BoxScore {...nhlBoxScoreProps(game, league)} />
    <UpdateTime lastUpdatedStr={lastUpdatedStr} />
  </section>
)
