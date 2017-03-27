import React, { PropTypes } from 'react'
import { Loading, NotFound } from 'components'
import { ScoreboardContainer } from 'containers'

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  scores: PropTypes.object.isRequired,
  year: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  today: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired
}

const defaultProps = {
  league: 'nba'
}

const Nba = ({ isLoading, isValid, scores, year, date, today, league }) => (
  <div>
    { isLoading
      ? <Loading />
      : isValid && scores
        ? <ScoreboardContainer scores={scores} year={year} date={date} today={today} league={league} />
        : <NotFound />
    }
  </div>
)

Nba.propTypes = propTypes
Nba.defaultProps = defaultProps

export default Nba
