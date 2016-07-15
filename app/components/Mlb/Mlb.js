import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import { Scoreboard, Date } from 'components'
import { container } from './styles.css'

export default function Mlb(props) {
  return (
    <div className={container}>
      <Date />
      <Scoreboard />
    </div>

  )
}
