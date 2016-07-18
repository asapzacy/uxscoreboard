import React, {PropTypes} from 'react'
import { Scoreboard } from 'components'
import { container } from './styles.css'

export default function Mlb(props) {
  return (
    <div className={container}>
      <Scoreboard />
    </div>

  )
}
