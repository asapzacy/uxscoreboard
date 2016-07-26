import React, {PropTypes} from 'react'
import { Scoreboard } from 'components'
import { Link } from 'react-router'
import { container, mlbLinks, mlbLink } from './styles.css'

export default function Mlb(props) {
  return (
    <div className={container}>
      <ul className={mlbLinks}>
       <li className={mlbLink}><Link to='/mlb/scores' activeClassName='active'>{'scores'}</Link></li>
       <li className={mlbLink}><Link to='/mlb//standings' activeClassName='active'>{'standings'}</Link></li>
      </ul>
    </div>
  )
}
