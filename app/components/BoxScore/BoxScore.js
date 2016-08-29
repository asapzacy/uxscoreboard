import React, { PropTypes } from 'react'
import { boxScoreContainer, mlb } from './styles.css'

const propTypes = {
  sport: PropTypes.string.isRequired,
  awayAbbr: PropTypes.string.isRequired,
  homeAbbr: PropTypes.string.isRequired,
  linescore: PropTypes.object.isRequired,
  review: PropTypes.object,
  status: PropTypes.string,
  awayScore: PropTypes.string,
  homeScore: PropTypes.string,

}

export default function BoxScore({sport, awayAbbr, homeAbbr, linescore, review,
  status, awayScore, homeScore}) {
  console.log(linescore)
  if (sport === 'mlb') {
    return (
      <MlbBoxScore
        awayAbbr={awayAbbr}
        homeAbbr={homeAbbr}
        linescore={linescore}
        review={review}
        status={status}
      />
    )
  }
  if (sport === 'nba') {
    return (
      <NbaBoxScore
        awayAbbr={awayAbbr}
        homeAbbr={homeAbbr}
        linescore={linescore}
        awayScore={awayScore}
        homeScore={homeScore}
      />
    )
  }
}

BoxScore.propTypes = propTypes

function NbaBoxScore({awayAbbr, homeAbbr, linescore, awayScore, homeScore}) {
  console.log(linescore)
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
            {Object.keys(linescore.away).length > 4 ?  <th>{'OT'}</th> : null}
            {Object.keys(linescore.away).length > 5 ?  <th>{'2OT'}</th> : null}
            {Object.keys(linescore.away).length > 6 ?  <th>{'3OT'}</th> : null}
            {Object.keys(linescore.away).length > 7 ?  <th>{'4OT'}</th> : null}
            <th>{'t'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{awayAbbr.toLowerCase()}</th>
            <td>{linescore.away[0].score}</td>
            <td>{linescore.away[1].score}</td>
            <td>{linescore.away[2].score}</td>
            <td>{linescore.away[3].score}</td>
            {Object.keys(linescore.away).length > 4 ? <td>{linescore.away[4].score}</td> : null}
            {Object.keys(linescore.away).length > 5 ? <td>{linescore.away[5].score}</td> : null}
            {Object.keys(linescore.away).length > 6 ? <td>{linescore.away[6].score}</td> : null}
            {Object.keys(linescore.away).length > 7 ? <td>{linescore.away[7].score}</td> : null}
            <td>{awayScore}</td>
          </tr>
          <tr>
            <th>{homeAbbr.toLowerCase()}</th>
            <td>{linescore.home[0].score}</td>
            <td>{linescore.home[1].score}</td>
            <td>{linescore.home[2].score}</td>
            <td>{linescore.home[3].score}</td>
            {Object.keys(linescore.home).length  > 4 ? <td>{linescore.home[4].score}</td> : null}
            {Object.keys(linescore.home).length  > 5 ? <td>{linescore.home[5].score}</td> : null}
            {Object.keys(linescore.home).length  > 6 ? <td>{linescore.home[6].score}</td> : null}
            {Object.keys(linescore.home).length  > 7 ? <td>{linescore.home[7].score}</td> : null}
            <td>{homeScore}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}




function MlbBoxScore({awayAbbr, homeAbbr, linescore, review, status}) {
  return (
    <div className={boxScoreContainer}>
      <table className={mlb}>
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
