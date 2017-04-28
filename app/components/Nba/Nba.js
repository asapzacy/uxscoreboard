import React from 'react'
import { Loading, NotFound } from 'components'
import { ScoreboardContainer } from 'containers'

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

Nba.defaultProps = { league: 'nba' }

export default Nba
