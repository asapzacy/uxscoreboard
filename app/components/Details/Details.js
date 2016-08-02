import React, { PropTypes } from 'react'
import { BoxScore, PreGameInfo, MidGameInfo, PostGameInfo } from 'components'
import { detailsDate } from 'helpers/utils'
import { detailsContainer, aboutContainer } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired
}

export default function Details({game, status}) {
  return (
    <div className={detailsContainer}>
      <div className={aboutContainer}>
        <span><strong>{`${game.away_team_name} v. ${game.home_team_name}`}</strong></span>
        <span><small>{`${detailsDate(game.original_date)} - ${game.location} - ${game.venue}`}</small></span>
      </div>
      <BoxScore
        awayAbbr={game.away_name_abbrev}
        homeAbbr={game.home_name_abbrev}
        awayCode={game.away_file_code}
        homeCode={game.home_file_code}
        linescore={game.linescore}
        review={game.review}
        status={game.status.status}
      />
      {status === 'Warmup' || status === 'Pre-Game' || status === 'Preview' || status === 'Delayed Start' || status === 'Postponed'
        ? <PreGameInfo
            awayAbbr={game.away_name_abbrev}
            homeAbbr={game.home_name_abbrev}
            spAway={game.away_probable_pitcher}
            spHome={game.home_probable_pitcher}
            alerts={game.alerts}
          />
          : status === 'In Progress' || status === 'Delayed' || status === 'Suspended'
            ? <MidGameInfo
                awayAbbr={game.away_name_abbrev}
                homeAbbr={game.home_name_abbrev}
                pitcher={game.pitcher}
                batter={game.batter}
                balls={game.status.b}
                strikes={game.status.s}
                outs={game.status.o}
                pbp={game.pbp}
                runners={game.runners_on_base}
                inningState={game.status.inning_state}
                alerts={game.alerts}
              />
            : status === 'Final' || status === 'Game Over' || status === 'Completed Early'
              ? <PostGameInfo
                pWin={game.winning_pitcher}
                pLoss={game.losing_pitcher}
                pSave={game.save_pitcher}
                />
              : null
          }
    </div>
  )
}

Details.propTypes = propTypes
