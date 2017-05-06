import React from 'react'
import { Loading, NotFound } from 'components'
import { ScoreboardContainer } from 'containers'

const defaultProps = {
  league: 'nfl'
}

const Nfl = ({ isLoading, isValid, scores, year, date, today, league }) => (
  <div>
    { isLoading
      ? <Loading />
      : isValid && scores
        ? <ScoreboardContainer scores={scores} year={year} date={date} today={today} league={league} />
        : <NotFound />
    }
  </div>
)

Nfl.defaultProps = defaultProps

export default Nfl
