import React from 'react'
import { Loading, NotFound } from 'components'
import { ScoreboardContainer } from 'containers'
import s from './League.scss'

const League = ({
  isLoading,
  isValid,
  isError,
  scores,
  year,
  date,
  today,
  league
}) => (
  <div className={s.container}>
    {isLoading ? (
      <Loading />
    ) : isValid && scores ? (
      <ScoreboardContainer
        scores={scores}
        year={year}
        date={date}
        today={today}
        league={league}
        isError={isError}
      />
    ) : (
      <NotFound />
    )}
  </div>
)

export default League
