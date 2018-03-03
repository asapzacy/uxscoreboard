import React from 'react'
import { Loading } from 'components'
import { ScoreboardContainer } from 'containers'
import s from './League.scss'

const League = ({ isLoading, isValid, isError, scores, year, date, today, league }) => (
  <div className={s.container}>
    { (isValid && scores) ? (
      <ScoreboardContainer
        scores={scores}
        year={year}
        date={date}
        today={today}
        league={league}
        isError={isError}
      />
    ) : <Loading />
    }
  </div>
)

export default League
