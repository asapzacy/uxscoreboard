import React, { PropTypes } from 'react'
import { BoxScore, PreGameInfo, MidGameInfo, PostGameInfo } from 'components'
import { formatDateStr } from 'helpers/utils'
import { detailsContainer, aboutContainer } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  sport: PropTypes.string.isRequired
}

export default function Details({game, sport}) {
  if (sport === 'mlb') {
    return <MlbDetails game={game} />
  }
  if (sport === 'nba') {
    return <NbaDetails game={game} />
  }
  if (sport === 'nhl') {
    return <NhlDetails game={game} />
  }
  else {
    return (
      <h1>{'i hope this doesn\'t run'}</h1>
    )
  }
}

Details.propTypes = propTypes


function About({awayTeam, homeTeam, date, location, venue}) {
  date = formatDateStr(date)
  return (
    <div className={aboutContainer}>
      <span><strong>{`${awayTeam} v. ${homeTeam}`}</strong></span>
      <span><small>{`${date} - ${location} - ${venue}`}</small></span>
    </div>
  )
}



function NhlDetails({game}) {
  return (
    <div className={detailsContainer}>
      <About
        awayTeam={game.teams.away.team.teamName}
        homeTeam={game.teams.home.team.teamName}
        date={game.gameDate}
        location={game.teams.home.team.venue.city}
        venue={game.venue.name}
      />
    </div>
  )
}


function NbaDetails({game}) {
  return (
    <div className={detailsContainer}>
      <About
        awayTeam={game.visitor.nickname}
        homeTeam={game.home.nickname}
        date={game.date}
        location={`${game.city}, ${game.state}`}
        venue={game.arena}
      />
    </div>
  )
}







function MlbDetails({game}) {
  const status = game.status.status
  return (
    <div className={detailsContainer}>
      <About
        awayTeam={game.away_team_name}
        homeTeam={game.home_team_name}
        date={game.original_date}
        location={game.location}
        venue={game.venue}
      />
      <BoxScore
        awayAbbr={game.away_name_abbrev}
        homeAbbr={game.home_name_abbrev}
        awayCode={game.away_file_code}
        homeCode={game.home_file_code}
        linescore={game.linescore}
        review={game.review}
        status={game.status.status}
      />
      {status === 'Warmup' || status === 'Pre-Game' || status === 'Preview' || status === 'Delayed Start' || status === 'Postponed'
        ? <PreGameInfo
            awayAbbr={game.away_name_abbrev}
            homeAbbr={game.home_name_abbrev}
            spAway={game.away_probable_pitcher}
            spHome={game.home_probable_pitcher}
            alerts={game.alerts}
          />
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
                alerts={game.alerts}
              />
            : status === 'Final' || status === 'Game Over' || status === 'Completed Early'
              ? <PostGameInfo
                pWin={game.winning_pitcher}
                pLoss={game.losing_pitcher}
                pSave={game.save_pitcher}
                />
              : null
          }
    </div>
  )
}
