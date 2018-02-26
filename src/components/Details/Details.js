import React from 'react'
import { Matchup, PanelMenu, Boxscore, Stats, Diamond, Leaders, UpdateTime } from 'components'
import { mlbMatchupProps, nbaMatchupProps, nhlMatchupProps } from '../Matchup/props'
import { mlbBoxscoreProps, nbaBoxscoreProps, nhlBoxscoreProps } from '../Boxscore/props'
import { mlbDiamondProps } from '../Diamond/props'
import { nbaStatsProps } from '../Stats/props'
import s from './Details.scss'

const Details = (props) => {
  switch (props.league) {
    case 'mlb': return <MlbDetails {...props} />
    case 'nba': return <NbaDetails {...props} />
    case 'nfl': return <NflDetails {...props} />
    case 'nhl': return <NhlDetails {...props} />
  }
}

export default Details

const MlbDetails = ({ game, date, league, panels, activePanel, switchPanel, lastUpdated }) => (
  <section className={s.container}>
    <Matchup {...mlbMatchupProps(game, date)} />
    <PanelMenu panels={panels} activePanel={activePanel} switchPanel={switchPanel} />
    { activePanel === 'box score' &&
      <Boxscore {...mlbBoxscoreProps(game, league)}>
        <Diamond {...mlbDiamondProps(game)} />
      </Boxscore>
    }
    <UpdateTime lastUpdated={lastUpdated} />
  </section>
)

const NbaDetails = ({ game, date, league, panels, activePanel, switchPanel, lastUpdated }) => (
  <section className={s.container}>
    <Matchup {...nbaMatchupProps(game, date)} />
    <PanelMenu panels={panels} activePanel={activePanel} switchPanel={switchPanel} />
    { activePanel === 'box score' &&
      <Boxscore {...nbaBoxscoreProps(game, league)} />
    }
    { activePanel === 'team stats' &&
      <Stats {...nbaStatsProps(game)} />
    }
    <UpdateTime lastUpdated={lastUpdated} />
  </section>
)

const NflDetails = ({ lastUpdated }) => (
  <section className={s.container}>
    <br />
    <br />
    <br />
    <br />
    <UpdateTime lastUpdated={lastUpdated} />
  </section>
)


const NhlDetails = ({ game, date, league, lastUpdated }) => (
  <section className={s.container}>
    <Matchup {...nhlMatchupProps(game, date)} />
    <Boxscore {...nhlBoxscoreProps(game, league)} />
    <UpdateTime lastUpdated={lastUpdated} />
  </section>
)
