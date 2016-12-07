import React, { PropTypes } from 'react'
import { BoxScore, Matchup, PreGameInfo, MidGameInfo, PostGameInfo } from 'components'
import { mlbMatchupProps, nhlMatchupProps } from 'helpers/gameProps'
import { detailsContainer, statsContainer, teamLeaders, teamStats } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired,
  details: PropTypes.object
}

export default function Details({ ...props }) {
  if (props.league === 'mlb') return <MlbDetails {...props} />
  if (props.league === 'nhl') return <NhlDetails {...props} />
  else return <h1>{'i hope this doesn\'t run'}</h1>
}

Details.propTypes = propTypes

function NhlDetails({ game, date, league }) {
  const matchupProps = nhlMatchupProps(game,date)
  return (
    <div className={detailsContainer}>
      <Matchup {...matchupProps} />
    </div>
  )
}






function MlbDetails({ game, date, league, expanded }) {
  const status = game.status.status
  const matchupProps = mlbMatchupProps(game,date)
  return (
    <div className={detailsContainer}>
      <Matchup {...matchupProps} />
      <BoxScore
        league={league}
        awayAbbr={game.away_name_abbrev}
        homeAbbr={game.home_name_abbrev}
        linescore={game.linescore}
        review={game.review}
        status={status}/>
      {status === 'Warmup' || status === 'Pre-Game' || status === 'Preview' || status === 'Delayed Start' || status === 'Postponed'
        ? <PreGameInfo
            awayAbbr={game.away_name_abbrev}
            homeAbbr={game.home_name_abbrev}
            spAway={game.away_probable_pitcher}
            spHome={game.home_probable_pitcher}
            alerts={game.alerts}/>
          : status === 'In Progress' || status === 'Delayed' || status === 'Suspended'
            ? <MidGameInfo
                awayAbbr={game.away_name_abbrev}
                homeAbbr={game.home_name_abbrev}
                pitcher={game.pitcher}
                batter={game.batter}
                balls={game.status.b}
                strikes={game.status.s}
                outs={game.status.o}
                pbp={game.pbp}
                runners={game.runners_on_base}
                inningState={game.status.inning_state}
                alerts={game.alerts}/>
            : status === 'Final' || status === 'Game Over' || status === 'Completed Early'
              ? <PostGameInfo
                pWin={game.winning_pitcher}
                pLoss={game.losing_pitcher}
                pSave={game.save_pitcher}/>
              : null}
    </div>
  )
}
