import React from 'react'
import moment from 'moment'
import { detailsContainer, aboutContainer, linescoreContainer,
  pitchersContainer, pitchersTeam } from './styles.css'

function formatDetailsDate(date) {
  return moment(new Date(date)).format('MMMM D, YYYY')
}

export default function Details({awayTeam, homeTeam, venue, location, date,
  linescore, awayAbbr, homeAbbr, awayPitcher, homePitcher}) {
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
        <Pitchers
          awayAbbr={awayAbbr}
          awayFirst={awayPitcher.first}
          awayLast={awayPitcher.last}
          awayEra={awayPitcher.era}
          awayLs={awayPitcher.losses}
          awayWs={awayPitcher.wins}
          homeAbbr={homeAbbr}
          homeFirst={homePitcher.first}
          homeLast={homePitcher.last}
          homeEra={homePitcher.era}
          homeLs={homePitcher.losses}
          homeWs={homePitcher.wins}
        />
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
          <td>{linescore.inning[0].away}</td>
          <td>{linescore.inning[1].away}</td>
          <td>{linescore.inning[2].away}</td>
          <td>{linescore.inning[3].away}</td>
          <td>{linescore.inning[4].away}</td>
          <td>{linescore.inning[5].away}</td>
          <td>{linescore.inning[6].away}</td>
          <td>{linescore.inning[7].away}</td>
          <td>{linescore.inning[8].away}</td>
          <td>{linescore.r.away}</td>
          <td>{linescore.h.away}</td>
          <td>{linescore.e.away}</td>
        </tr>
        <tr>
          <th>{homeAbbr}</th>
          <td>{linescore.inning[0].home}</td>
          <td>{linescore.inning[1].home}</td>
          <td>{linescore.inning[2].home}</td>
          <td>{linescore.inning[3].home}</td>
          <td>{linescore.inning[4].home}</td>
          <td>{linescore.inning[5].home}</td>
          <td>{linescore.inning[6].home}</td>
          <td>{linescore.inning[7].home}</td>
          <td>{linescore.inning[8].home}</td>
          <td>{linescore.r.home}</td>
          <td>{linescore.h.home}</td>
          <td>{linescore.e.home}</td>
        </tr>
      </tbody>
    </table>
  )
}
