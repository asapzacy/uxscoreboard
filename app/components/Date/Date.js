import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Left from 'react-icons/lib/fa/angle-left'
import Right from 'react-icons/lib/fa/angle-right'
import moment from 'moment'
import { dateContainer, currentDay, dayContainer,
  upperStr, lowerStr } from './styles.css'

const dateUrl = (date, i) => moment(date).add(i, 'days').format('YYYYMMDD')
const dateUpperStr = (date, i) => moment(date).add(i, 'days').format('dddd')
const dateLowerStr = (date, i) => moment(date).add(i, 'days').format('MMMM D')

export default function Date({date}) {
  return (
    <ul className={dateContainer}>
      <li><Left /></li>
      <li><Day date={date} diff={-3} /></li>
      <li><Day date={date} diff={-2} /></li>
      <li><Day date={date} diff={-1} /></li>
      <li className={currentDay}><Day date={date} diff={0} /></li>
      <li><Day date={date} diff={1} /></li>
      <li><Day date={date} diff={2} /></li>
      <li><Day date={date} diff={3} /></li>
      <li><Right /></li>
    </ul>
  )
}

function Day({date, diff}) {
  const day = moment(date).add(diff, 'days')
  const url = day.format('YYYYMMDD')
  const weekDay = day.format('ddd').toLowerCase()
  const monthDay = day.format('MMM D')
  return (
    <Link to={`/mlb/scores/${url}`} className={dayContainer}>
      <span className={upperStr}>{weekDay}</span>
      <span className={lowerStr}>{monthDay}</span>
    </Link>
  )
}
