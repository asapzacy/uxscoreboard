import React from 'react'
import { Loading, NotFound } from 'components'
import { ScoreboardContainer } from 'containers'

const Mlb = ({ isLoading, isValid, isError, scores, year, date, today, league }) => (
  <div>
    { isLoading
      ? <Loading />
      : isValid && scores
        ? <ScoreboardContainer scores={scores} year={year} date={date} today={today} league={league} isError={isError} />
        : <NotFound />
    }
  </div>
)

Mlb.defaultProps = { league: 'mlb' }

export default Mlb
