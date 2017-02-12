import React, { PropTypes } from 'react'
import { Loading, Scoreboard, NotFound } from 'components'
import { ScoreboardContainer } from 'containers'

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  scores: PropTypes.object.isRequired,
  scores: PropTypes.object.isRequired,
  season: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  today: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired
}

const defaultProps = {
  league: 'nba'
}

export default function Nba({ isLoading, isValid, scores, season, date, today, league }) {
  return (
    <div>
      { isLoading
        ? <Loading />
        : isValid && scores
          ? <ScoreboardContainer scores={scores} season={season} date={date} today={today} league={league} />
          : <NotFound />
      }
    </div>
  )
}

Nba.propTypes = propTypes
Nba.defaultProps = defaultProps
