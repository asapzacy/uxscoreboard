import React from 'react'
import s from './Event.scss'

const Event = ({ bgImg }) => (
  <li
    className={s.event}
    style={{ background: `${bgImg} center center / contain no-repeat` }}
  />
)

export default Event
