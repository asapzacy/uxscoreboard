import React, { PropTypes } from 'react'
import { Loading, Scoreboard, NotFound } from 'components'

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  scores: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  league: PropTypes.string
}

const defaultProps = {
  league: 'mlb'
}

export default function Mlb({ isLoading, isValid, scores, date, league }) {
  return (
    <div>
      { isLoading
        ? <Loading speed={300} text={'loading'} />
        : isValid && scores
          ? <Scoreboard scores={scores} date={date} league={league} />
          : <NotFound />
      }
    </div>
  )
}

Mlb.propTypes = propTypes
Mlb.defaultProps = defaultProps
