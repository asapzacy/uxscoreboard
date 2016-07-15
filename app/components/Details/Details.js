import React from 'react'
import { detailsContainer, locationContainer, linescoreContainer } from './styles.css'


export default function Details({venue, location, linescore, awayAbbr, homeAbbr}) {
  return (
    <div className={detailsContainer}>
      <div className={locationContainer}>
        <span>{location}</span>
        <span>{venue}</span>
      </div>
      <div className={linescoreContainer}>
        <BoxScore linescore={linescore} awayAbbr={awayAbbr} homeAbbr={homeAbbr} />
      </div>
    </div>
  )
}

export function BoxScore({linescore, awayAbbr, homeAbbr}) {
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
          <td>{linescore.inning[8].home ? linescore.inning[8].home : '-'}</td>
          <td>{linescore.r.home}</td>
          <td>{linescore.h.home}</td>
          <td>{linescore.e.home}</td>
        </tr>
      </tbody>
    </table>
  )
}
