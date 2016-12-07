import React, { PropTypes } from 'react'
import { formatTableHeaderRow, formatTableBodyRow } from 'helpers/boxScore'
import { boxScoreContainer, tableContainer, tableHead, tableBody } from './styles.css'

export default function BoxScore({ awayAbbr, homeAbbr, awayScore, homeScore, linescore, prds, ots }) {
  console.log(linescore)
  return (
    <div className={boxScoreContainer}>
      <table className={tableContainer}>
        <thead className={tableHead}>
          <tr dangerouslySetInnerHTML={formatTableHeaderRow(prds,ots)}></tr>
        </thead>
        <tbody className={tableBody}>
          <tr dangerouslySetInnerHTML={formatTableBodyRow(awayAbbr,awayScore,'away',linescore)}></tr>
          <tr dangerouslySetInnerHTML={formatTableBodyRow(homeAbbr,homeScore,'home',linescore)}></tr>
        </tbody>
      </table>
    </div>
  )
}

function MlbBoxScore({awayAbbr, homeAbbr, linescore, review, status}) {
  return (
    <div className={boxScoreContainer}>
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
            <th>{'c'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{awayAbbr.toLowerCase()}</th>
            <td>{linescore.inning[0] ? linescore.inning[0].away : linescore.inning.away ? linescore.inning.away : ''}</td>
            <td>{linescore.inning[1] ? linescore.inning[1].away : ''}</td>
            <td>{linescore.inning[2] ? linescore.inning[2].away : ''}</td>
            <td>{linescore.inning[3] ? linescore.inning[3].away : ''}</td>
            <td>{linescore.inning[4] ? linescore.inning[4].away : ''}</td>
            <td>{linescore.inning[5] ? linescore.inning[5].away : ''}</td>
            <td>{linescore.inning[6] ? linescore.inning[6].away : ''}</td>
            <td>{linescore.inning[7] ? linescore.inning[7].away : ''}</td>
            <td>{linescore.inning[8] ? linescore.inning[8].away : ''}</td>
            <td>{linescore.r.away}</td>
            <td>{linescore.h.away}</td>
            <td>{linescore.e.away}</td>
            <td>{review.challenges_away_remaining[0] ? review.challenges_away_remaining >= '1' ? '✓' : '✗' : status === 'Final' ? '-' : ''}</td>
          </tr>
          <tr>
            <th>{homeAbbr.toLowerCase()}</th>
            <td>{linescore.inning[0] ? linescore.inning[0].home : linescore.inning.home ? linescore.inning.home : ''}</td>
            <td>{linescore.inning[1] ? linescore.inning[1].home : ''}</td>
            <td>{linescore.inning[2] ? linescore.inning[2].home : ''}</td>
            <td>{linescore.inning[3] ? linescore.inning[3].home : ''}</td>
            <td>{linescore.inning[4] ? linescore.inning[4].home : ''}</td>
            <td>{linescore.inning[5] ? linescore.inning[5].home : ''}</td>
            <td>{linescore.inning[6] ? linescore.inning[6].home : ''}</td>
            <td>{linescore.inning[7] ? linescore.inning[7].home : ''}</td>
            <td>{linescore.inning[8] ? linescore.inning[8].away ? linescore.inning[8].home !== undefined ? linescore.inning[8].home : '✗' : '' : null}</td>
            <td>{linescore.r.home}</td>
            <td>{linescore.h.home}</td>
            <td>{linescore.e.home}</td>
            <td>{review.challenges_home_remaining[0] ? review.challenges_home_remaining >= '1' ? '✓' : '✗' : status === 'Final' ? '-' : ''}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
