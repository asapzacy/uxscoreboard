import React from 'react'
import { Loading, Scoreboard, NotFound } from 'components'
import { ScoreboardContainer } from 'containers'

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

Nhl.defaultProps = defaultProps
