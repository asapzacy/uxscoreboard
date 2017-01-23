import React, { PropTypes } from 'react'
import { statsContainer } from './styles.css'

export default function Stats({ away, home }) {
  return (
    <div className={statsContainer}>
       <table>
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
