import React, { PropTypes } from 'react'
import { alertsContainer, pitchingInfo } from './styles.css'

const propTypes = {
  awayAbbr: PropTypes.string.isRequired,
  homeAbbr: PropTypes.string.isRequired,
  spAway: PropTypes.object,
  spHome: PropTypes.object,
  alerts: PropTypes.object.isRequired
}

export default function PreGameInfo({awayAbbr, homeAbbr, spAway, spHome, alerts}) {
  return (
    <div>
      {alerts.text[0] ? <div className={alertsContainer}>{alerts.text}</div> : null}
      {spAway && spHome
        ? <div className={pitchingInfo}>
            <h4>{'starting pitchers:'}</h4>
            <span>
              <strong>{`${awayAbbr.toLowerCase()}:`}</strong>
              {spAway.last ? ` ${spAway.last}, ${spAway.throwinghand.toLowerCase()} (${spAway.wins}-${spAway.losses}, ${spAway.era} era)` : 'TBA'}
            </span>
            <span>
              <strong>{`${homeAbbr.toLowerCase()}:`}</strong>
              {spHome.last ? ` ${spHome.last}, ${spAway.throwinghand.toLowerCase()} (${spHome.wins}-${spHome.losses}, ${spHome.era} era)` : 'TBA'}
            </span>
          </div>
        : null
      }
    </div>
  )
}

PreGameInfo.propTypes = propTypes
