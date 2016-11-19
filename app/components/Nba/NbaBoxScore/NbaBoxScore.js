import React, { PropTypes } from 'react'

export default function NbaBoxScore({awayAbbr, homeAbbr, linescore, awayScore, homeScore}) {
  // let's hope an nba game doesn't go over 4ot this year..
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>{'1'}</th>
            <th>{'2'}</th>
            <th>{'3'}</th>
            <th>{'4'}</th>
            {Object.keys(linescore.away.period).length > 4 ? <th>{'OT'}</th> : null}
            {Object.keys(linescore.away.period).length > 5 ? <th>{'2OT'}</th> : null}
            {Object.keys(linescore.away.period).length > 6 ? <th>{'3OT'}</th> : null}
            {Object.keys(linescore.away.period).length > 7 ? <th>{'4OT'}</th> : null}
            <th>{'t'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{awayAbbr.toLowerCase()}</th>
            <td>{linescore.away.period[0].score}</td>
            <td>{linescore.away.period[1].score}</td>
            <td>{linescore.away.period[2].score}</td>
            <td>{linescore.away.period[3].score}</td>
            {Object.keys(linescore.away.period).length > 4 ? <td>{linescore.away.period[4].score}</td> : null}
            {Object.keys(linescore.away.period).length > 5 ? <td>{linescore.away.period[5].score}</td> : null}
            {Object.keys(linescore.away.period).length > 6 ? <td>{linescore.away.period[6].score}</td> : null}
            {Object.keys(linescore.away.period).length > 7 ? <td>{linescore.away.period[7].score}</td> : null}
            <td>{awayScore}</td>
          </tr>
          <tr>
            <th>{homeAbbr.toLowerCase()}</th>
            <td>{linescore.home.period[0].score}</td>
            <td>{linescore.home.period[1].score}</td>
            <td>{linescore.home.period[2].score}</td>
            <td>{linescore.home.period[3].score}</td>
            {Object.keys(linescore.home.period).length > 4 ? <td>{linescore.home.period[4].score}</td> : null}
            {Object.keys(linescore.home.period).length > 5 ? <td>{linescore.home.period[5].score}</td> : null}
            {Object.keys(linescore.home.period).length > 6 ? <td>{linescore.home.period[6].score}</td> : null}
            {Object.keys(linescore.home.period).length > 7 ? <td>{linescore.home.period[7].score}</td> : null}
            <td>{homeScore}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
