import React, { PropTypes } from 'react'
import { Loading, Scoreboard, NotFound } from 'components'
import { ScoreboardContainer } from 'containers'

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  scores: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  today: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired
}

const defaultProps = {
  league: 'nhl'
}

export default function Nhl({ isLoading, isValid, scores, date, today, league }) {
  return (
    <div>
      { isLoading
        ? <Loading />
        : isValid && scores
          ? <ScoreboardContainer scores={scores} year={2016} date={date} today={today} league={league} />
          : <NotFound />
      }
    </div>
  )
}

Nhl.propTypes = propTypes
Nhl.defaultProps = defaultProps
