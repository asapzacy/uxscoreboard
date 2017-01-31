import React, { PropTypes } from 'react'
import { Loading } from 'components'
import { nflContainer } from './styles.css'

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  scores: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  today: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired
}

const defaultProps = {
  league: 'nfl'
}

export default function Nfl({ isLoading, isValid, scores, date, today, league }) {
  return (
    <div>
      { isLoading
        ? <Loading />
        : <div className={nflContainer}><h1>{'sorry :/'}</h1><h2>{'coming soon.. '}</h2></div>
      }
    </div>
  )
}

Nfl.propTypes = propTypes
Nfl.defaultProps = defaultProps
