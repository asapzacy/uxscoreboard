import React, { PropTypes } from 'react'
import { nbaStatsProps } from 'helpers/props/statsProps'
import { statsContainer, statsTable, statsTableHead,
  statsTableBody, statsTableRow } from './styles.css'

export default function Stats({ game, away, home }) {
  const { homeTeam, awayTeam } = nbaStatsProps(game)
  return (
    <div className={statsContainer}>
       <table className={statsTable}>
         <thead className={statsTableHead}>
           <tr className={statsTableRow}>
            <th></th>
            <th>{homeTeam}</th>
            <th>{awayTeam}</th>
           </tr>
         </thead>
         <tbody className={statsTableBody}>
           <tr className={statsTableRow}>
             <th>{'points'}</th>
             <td>{away.stats.points}</td>
             <td>{home.stats.points}</td>
           </tr>
           <tr className={statsTableRow}>
             <th>{'field goal %'}</th>
             <td>{`${Math.ceil(away.stats.field_goals_percentage)}%`}</td>
             <td>{`${Math.ceil(home.stats.field_goals_percentage)}%`}</td>
           </tr>
           <tr className={statsTableRow}>
             <th>{'3-point %'}</th>
             <td>{`${Math.ceil(away.stats.three_pointers_percentage)}%`}</td>
             <td>{`${Math.ceil(home.stats.three_pointers_percentage)}%`}</td>
           </tr>
           <tr className={statsTableRow}>
             <th>{'free throw %'}</th>
             <td>{`${Math.ceil(away.stats.free_throws_percentage)}%`}</td>
             <td>{`${Math.ceil(home.stats.free_throws_percentage)}%`}</td>
           </tr>
           <tr className={statsTableRow}>
             <th>{'rebounds'}</th>
             <td>{+away.stats.rebounds_defensive + +away.stats.rebounds_offensive + +away.stats.team_rebounds}</td>
             <td>{+home.stats.rebounds_defensive + +home.stats.rebounds_offensive + +home.stats.team_rebounds}</td>
           </tr>
           <tr className={statsTableRow}>
             <th>{'assists'}</th>
             <td>{away.stats.assists}</td>
             <td>{home.stats.assists}</td>
           </tr>
           <tr className={statsTableRow}>
             <th>{'blocks'}</th>
             <td>{away.stats.blocks}</td>
             <td>{home.stats.blocks}</td>
           </tr>
           <tr className={statsTableRow}>
             <th>{'fouls'}</th>
             <td>{away.stats.fouls}</td>
             <td>{home.stats.fouls}</td>
           </tr>
           <tr className={statsTableRow}>
             <th>{'steals'}</th>
             <td>{away.stats.steals}</td>
             <td>{home.stats.steals}</td>
           </tr>
           <tr className={statsTableRow}>
             <th>{'turnovers'}</th>
             <td>{away.stats.turnovers}</td>
             <td>{home.stats.turnovers}</td>
           </tr>
         </tbody>
       </table>
    </div>
  )
}
