import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import ArrowBack from 'react-icons/lib/io/ios-arrow-back'
import ArrowForward from 'react-icons/lib/io/ios-arrow-forward'
import { dateMenu, dateList, dateItem, arrowItem, dateLink, mainLink, dateText } from './styles.css'

// TODO: implement a calendar
const Date = ({ width, ...props }) => (
  <nav className={dateMenu}>
    { props.league !== 'nfl' &&
      <menu className={dateList}>
        <li className={arrowItem}><Day {...props} diff={-1} isArrow /></li>
        { width >= 1331 &&
        <li className={dateItem}><Day {...props} diff={-2} /></li> }
        { width >= 667 &&
        <li className={dateItem}><Day {...props} diff={-1} /></li> }
        <li className={dateItem}><Day {...props} diff={0} /></li>
        { width >= 667 &&
        <li className={dateItem}><Day {...props} diff={1} /></li> }
        { width >= 1331 &&
        <li className={dateItem}><Day {...props} diff={2} /></li> }
        <li className={arrowItem}><Day {...props} diff={1} isArrow /></li>
      </menu>
    }
    { props.league === 'nfl' &&
      <menu className={dateList} style={{justifyContent:'center'}}>
        <li>{'[ coming soon ]'}</li>
      </menu>
    }
  </nav>
)


export default Date

// TODO: remove the arrows at end of last season//start of next season
function Day({ date, today, league, diff, isArrow }) {
  const day = moment(date).add(diff, 'days')
  const url = day.format('YYYYMMDD')
  const isMainLink = diff === 0
  const dayOfTheWeek = today === url ? 'today' : isMainLink ? day.format('dddd') :  day.format('ddd')
  const formattedDate = `${dayOfTheWeek}, ${day.format('MMM D')}`.toLowerCase()
  const title = `${league.toUpperCase()} scores - ${day.format('MMMM D, YYYY')} | uxscoreboard`
  return (
    <Link className={isMainLink ? mainLink : dateLink} to={`/${league}/scores/${url}`} title={title}>
      { !isArrow
        ? <span className={isMainLink ? dateText : ''}>{formattedDate}</span>
        : diff < 0 ? <ArrowBack /> : <ArrowForward />
      }
    </Link>
  )
}
