import React from 'react'
import { formatDetailsDate } from 'helpers/utils'
import OpenCircle from 'react-icons/lib/fa/circle-thin'
import FullCircle from 'react-icons/lib/fa/circle'
import { detailsContainer, aboutContainer, linescoreContainer,
  pitchersContainer, pitchersTeam, diamond, circles, bso} from './styles.css'

export default function Details({awayTeam, homeTeam, venue, location, date,
  linescore, awayAbbr, homeAbbr, pitcher, batter, pbp, runners, balls, strikes, outs}) {
  return (
    <div className={detailsContainer}>
      <div className={aboutContainer}>
        <span><strong>{`${awayTeam} v. ${homeTeam}`}</strong></span>
        <span><small>{`${formatDetailsDate(date)} - ${location} - ${venue}`}</small></span>
      </div>
      <div className={linescoreContainer}>
        <BoxScore linescore={linescore} awayAbbr={awayAbbr} homeAbbr={homeAbbr} />
      </div>
      <div className={pitchersContainer}>
        <MidGameInfo
          awayAbbr={awayAbbr}
          homeAbbr={homeAbbr}
          pitcher={pitcher}
          batter={batter}
          pbp={pbp}
          runners={runners}
          balls={balls}
          strikes={strikes}
          outs={outs}
        />
      </div>
    </div>
  )
}

function getBaseRunners(runners) {
  let img = '0b'
  if (runners.runner_on_1b)
    img += '1b'
  else if (runners.runner_on_2b)
    img += '2b'
  else if (runners.runner_on_3b)
    img += '3b'
  return img
}

const getBalls = (balls) => {
  switch(balls) {
    case '3': return <span className={circles}><FullCircle /><FullCircle /><FullCircle /><FullCircle /></span>
    case '3': return <span className={circles}><FullCircle /><FullCircle /><FullCircle /><OpenCircle /></span>
    case '2': return <span className={circles}><FullCircle /><FullCircle /><OpenCircle /><OpenCircle /></span>
    case '1': return <span className={circles}><FullCircle /><OpenCircle /><OpenCircle /><OpenCircle /></span>
    default: return <span className={circles}><OpenCircle /><OpenCircle /><OpenCircle /><OpenCircle /></span>
  }
}
const getStrikesOrOuts = (SOs) => {
  switch(SOs) {
    case '3': return <span className={circles}><FullCircle /><FullCircle /><FullCircle /></span>
    case '2': return <span className={circles}><FullCircle /><FullCircle /><OpenCircle /></span>
    case '1': return <span className={circles}><FullCircle /><OpenCircle /><OpenCircle /></span>
    default: return <span className={circles}><OpenCircle /><OpenCircle /><OpenCircle /></span>
  }
}

function MidGameInfo({awayAbbr, homeAbbr, pitcher, batter, pbp, runners, balls,
  strikes, outs}) {
  return (
    <div>
      <div className={diamond}>
        <img src={`assets/img/mlb/other/diamond-${getBaseRunners(runners)}.svg`} />
        <div>
          <span className={bso}><strong>{`b:`}</strong>{getBalls(balls)}</span><br />
          <span className={bso}><strong>{`s:`}</strong>{getStrikesOrOuts(strikes)}</span><br />
          <span className={bso}><strong>{`o:`}</strong>{getStrikesOrOuts(outs)}</span><br />
        </div>
      </div>
      <div>
        <h5>{'Current Matchup:'}</h5>
        <span className={pitchersTeam}>{`P: `}</span>
        <span>{`${pitcher.first} ${pitcher.last} (${pitcher.ip} ip, ${pitcher.er} er)`}</span>
        <br />
        <span className={pitchersTeam}>{`H: `}</span>
        <span>{`${batter.first} ${batter.last} (${batter.h}-${batter.ab})`}</span>
        <br />
      </div>
      <div>
        <br />
        <h5>{'Last Play:'}</h5>
        <span>{pbp.last}</span>
      </div>
    </div>

  )
}

function Pitchers({awayAbbr, awayFirst, awayLast, awayLs, awayWs, awayEra,
  homeAbbr, homeFirst, homeLast, homeLs, homeWs, homeEra}) {
  return (
    <div>
      <h5>{'Starting Pitchers'}</h5>
      <div>
        <span className={pitchersTeam}>{`${awayAbbr}: `}</span>
        <span>{`${awayFirst} ${awayLast} (${awayLs}-${awayWs}, ${awayEra})`}</span>
      </div>
      <div>
        <span className={pitchersTeam}>{`${homeAbbr}: `}</span>
        <span>{`${homeFirst} ${homeLast} (${homeLs}-${homeWs}, ${homeEra})`}</span>
      </div>
    </div>
  )
}

function BoxScore({linescore, awayAbbr, homeAbbr}) {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>{'1'}</th>
          <th>{'2'}</th>
          <th>{'3'}</th>
          <th>{'4'}</th>
          <th>{'5'}</th>
          <th>{'6'}</th>
          <th>{'7'}</th>
          <th>{'8'}</th>
          <th>{'9'}</th>
          <th>{'r'}</th>
          <th>{'h'}</th>
          <th>{'e'}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{awayAbbr}</th>
          <td>{linescore.inning[0] ? linescore.inning[0].away : null}</td>
          <td>{linescore.inning[1] ? linescore.inning[1].away : null}</td>
          <td>{linescore.inning[2] ? linescore.inning[2].away : null}</td>
          <td>{linescore.inning[3] ? linescore.inning[3].away : null}</td>
          <td>{linescore.inning[4] ? linescore.inning[4].away : null}</td>
          <td>{linescore.inning[5] ? linescore.inning[5].away : null}</td>
          <td>{linescore.inning[6] ? linescore.inning[6].away : null}</td>
          <td>{linescore.inning[7] ? linescore.inning[7].away : null}</td>
          <td>{linescore.inning[8] ? linescore.inning[8].away : null}</td>
          <td>{linescore.r.away}</td>
          <td>{linescore.h.away}</td>
          <td>{linescore.e.away}</td>
        </tr>
        <tr>
          <th>{homeAbbr}</th>
          <td>{linescore.inning[0] ? linescore.inning[0].home : null}</td>
          <td>{linescore.inning[1] ? linescore.inning[1].home : null}</td>
          <td>{linescore.inning[2] ? linescore.inning[2].home : null}</td>
          <td>{linescore.inning[3] ? linescore.inning[3].home : null}</td>
          <td>{linescore.inning[4] ? linescore.inning[4].home : null}</td>
          <td>{linescore.inning[5] ? linescore.inning[5].home : null}</td>
          <td>{linescore.inning[6] ? linescore.inning[6].home : null}</td>
          <td>{linescore.inning[7] ? linescore.inning[7].home : null}</td>
          <td>{linescore.inning[8] ? linescore.inning[8].home : null}</td>
          <td>{linescore.r.home}</td>
          <td>{linescore.h.home}</td>
          <td>{linescore.e.home}</td>
        </tr>
      </tbody>
    </table>
  )
}
