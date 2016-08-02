import React, { PropTypes } from 'react'
import { baseRunners, ballCount, strikeOutCount } from 'helpers/utils'
import { alertsContainer, diamondContainer, baseballField, sideContainer,
  runnersOnBase, ballsStrikesOuts, bso, circle, circleFilled, phInfo } from './styles.css'

const propTypes = {
  awayAbbr: PropTypes.string.isRequired,
  homeAbbr: PropTypes.string.isRequired,
  pitcher: PropTypes.object.isRequired,
  batter: PropTypes.object.isRequired,
  balls: PropTypes.string.isRequired,
  strikes: PropTypes.string.isRequired,
  outs: PropTypes.string.isRequired,
  pbp: PropTypes.object.isRequired,
  runners: PropTypes.object.isRequired,
  inningState: PropTypes.string.isRequired,
  alerts: PropTypes.object.isRequired
}

export default function MidGameInfo({awayAbbr, homeAbbr, pitcher, batter,
  balls, strikes, outs, pbp, runners, inningState, alerts}) {
  return (
    <div>
      { alerts.text[0]
          ? <div className={alertsContainer}><span>{`${alerts.text}.`}</span></div>
          : null
      }
      <div className={diamondContainer}>
        <div className={baseballField}>
          <img src={`assets/img/mlb/other/diamond-${baseRunners(runners)}.svg`} />
        </div>
        <div className={sideContainer}>
          <div className={runnersOnBase}>
            { Object.keys(runners).length > 1
              ? <h4>{'Runners on Base:'}</h4>
              : null
            }
            { runners.runner_on_1b
              ? <span><strong>{`1b:`}</strong>{` ${runners.runner_on_1b.last}`}</span>
              : null
            }
            { runners.runner_on_2b
              ? <span><strong>{`2b:`}</strong>{` ${runners.runner_on_2b.last}`}</span>
              : null
            }
            { runners.runner_on_3b
              ? <span><strong>{`3b:`}</strong>{` ${runners.runner_on_3b.last}`}</span>
              : null
            }
          </div>
          <div className={ballsStrikesOuts}>
            <span className={bso}>
              <strong>{`b:`}</strong>
              <span dangerouslySetInnerHTML={ballCount(balls,inningState)}></span>
            </span>
            <span className={bso}>
              <strong>{`s:`}</strong>
              <span dangerouslySetInnerHTML={strikeOutCount(strikes,inningState)}></span>
            </span>
            <span className={bso}>
              <strong>{`o:`}</strong>
              <span dangerouslySetInnerHTML={strikeOutCount(outs,inningState)}></span>
            </span>
          </div>
        </div>
      </div>
      <div className={phInfo}>
        <h4>{'Current Matchup:'}</h4>
        <span>
          <strong>{`p:`}</strong>
          {` ${pitcher.last} (${pitcher.ip} ip, ${pitcher.er} er)`}
        </span>
        <span>
          <strong>{`h:`}</strong>
          {` ${batter.last} (${batter.h}-${batter.ab})`}
        </span>
      </div>
      <div className={phInfo}>
        <h4>{'Last Play:'}</h4>
        <span>{pbp.last}</span>
      </div>
    </div>
  )
}

MidGameInfo.propTypes = propTypes
