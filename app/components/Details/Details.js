import React, { PropTypes } from 'react'
import { BoxScore, PreGameInfo, MidGameInfo, PostGameInfo } from 'components'
import { formatDateStr } from 'helpers/utils'
import { detailsContainer, aboutContainer, statsContainer,
  teamLeaders, teamStats } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  sport: PropTypes.string.isRequired,
  details: PropTypes.object
}

export default function Details({game, sport, details}) {
  if (sport === 'mlb')
    return <MlbDetails game={game} sport={sport} />
  if (sport === 'nba')
    return <NbaDetails game={game} sport={sport} details={details} />
  if (sport === 'nhl')
    return <NhlDetails game={game} sport={sport} />
  else
    return <h1>{'i hope this doesn\'t run'}</h1>
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


function NbaDetails({game, sport, details}) {
  const linescore = {}
  linescore['away'] = game.visitor.linescores
  linescore['home'] = game.home.linescores
  return (
    <div className={detailsContainer}>
      <About
        awayTeam={game.visitor.nickname}
        homeTeam={game.home.nickname}
        date={game.date}
        location={`${game.city}, ${game.state}`}
        venue={game.arena}
      />
      <BoxScore
        sport={sport}
        awayAbbr={game.visitor.abbreviation}
        homeAbbr={game.home.abbreviation}
        linescore={linescore}
        awayScore={game.visitor.score}
        homeScore={game.home.score}
      />
      {Object.keys(details).length > 0 ? <Stats away={details.visitor} home={details.home} /> : null}
    </div>
  )
}

function Stats({away, home}) {
  return (
    <div className={statsContainer}>
      <table className={teamLeaders}>
        <thead>
          <tr>
            <th>{'team leaders'}</th>
            <th>{away.abbreviation.toLowerCase()}</th>
            <th>{home.abbreviation.toLowerCase()}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{'points'}</th>
            <td><strong>{away.Leaders.Points.StatValue}</strong><br /><small>{away.Leaders.Points.leader[0].LastName}</small></td>
            <td><strong>{home.Leaders.Points.StatValue}</strong><br /><small>{home.Leaders.Points.leader[0].LastName}</small></td>
          </tr>
          <tr>
            <th>{'rebounds'}</th>
            <td><strong>{away.Leaders.Rebounds.StatValue}</strong><br /><small>{away.Leaders.Rebounds.leader[0].LastName}</small></td>
            <td><strong>{home.Leaders.Rebounds.StatValue}</strong><br /><small>{home.Leaders.Rebounds.leader[0].LastName}</small></td>
          </tr>
          <tr>
            <th>{'assists'}</th>
            <td><strong>{away.Leaders.Assists.StatValue}</strong><br /><small>{away.Leaders.Assists.leader[0].LastName}</small></td>
            <td><strong>{home.Leaders.Assists.StatValue}</strong><br /><small>{home.Leaders.Assists.leader[0].LastName}</small></td>
          </tr>
        </tbody>
      </table>
       <table className={teamStats}>
         <thead>
           <tr>
            <th>{'team stats'}</th>
            <th>{away.abbreviation.toLowerCase()}</th>
            <th>{home.abbreviation.toLowerCase()}</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <th>{'points'}</th>
             <td>{away.stats.points}</td>
             <td>{home.stats.points}</td>
           </tr>
           <tr>
             <th>{'field goal %'}</th>
             <td>{`${Math.ceil(away.stats.field_goals_percentage)}%`}</td>
             <td>{`${Math.ceil(home.stats.field_goals_percentage)}%`}</td>
           </tr>
           <tr>
             <th>{'3-point %'}</th>
             <td>{`${Math.ceil(away.stats.three_pointers_percentage)}%`}</td>
             <td>{`${Math.ceil(home.stats.three_pointers_percentage)}%`}</td>
           </tr>
           <tr>
             <th>{'free throw %'}</th>
             <td>{`${Math.ceil(away.stats.free_throws_percentage)}%`}</td>
             <td>{`${Math.ceil(home.stats.free_throws_percentage)}%`}</td>
           </tr>
           <tr>
             <th>{'rebounds'}</th>
             <td>{+away.stats.rebounds_defensive + +away.stats.rebounds_offensive + +away.stats.team_rebounds}</td>
             <td>{+home.stats.rebounds_defensive + +home.stats.rebounds_offensive + +home.stats.team_rebounds}</td>
           </tr>
           <tr>
             <th>{'assists'}</th>
             <td>{away.stats.assists}</td>
             <td>{home.stats.assists}</td>
           </tr>
           <tr>
             <th>{'blocks'}</th>
             <td>{away.stats.blocks}</td>
             <td>{home.stats.blocks}</td>
           </tr>
           <tr>
             <th>{'fouls'}</th>
             <td>{away.stats.fouls}</td>
             <td>{home.stats.fouls}</td>
           </tr>
           <tr>
             <th>{'steals'}</th>
             <td>{away.stats.steals}</td>
             <td>{home.stats.steals}</td>
           </tr>
           <tr>
             <th>{'turnovers'}</th>
             <td>{away.stats.turnovers}</td>
             <td>{home.stats.turnovers}</td>
           </tr>
         </tbody>
       </table>
    </div>
  )
}

















function MlbDetails({game, sport}) {
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
        sport={sport}
        awayAbbr={game.away_name_abbrev}
        homeAbbr={game.home_name_abbrev}
        linescore={game.linescore}
        review={game.review}
        status={status}
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
