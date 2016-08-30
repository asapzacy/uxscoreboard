import React, { PropTypes } from 'react'
import { pitchingInfo } from './styles.css'

const propTypes = {
  pWin: PropTypes.object.isRequired,
  pLoss: PropTypes.object.isRequired,
  pSave: PropTypes.object.isRequired
}

export default function PostGameInfo({pWin, pLoss, pSave}) {
  return (
    <div className={pitchingInfo}>
      <span>
        <strong>{'w: '}</strong>
        {`${pWin.last} (${pWin.wins}-${pWin.losses})`}
      </span>
      <span>
        <strong>{'l: '}</strong>
        {`${pLoss.last} (${pLoss.wins}-${pLoss.losses})`}
      </span>
      {pSave.last ? <span><strong>{'s: '}</strong>{`${pSave.last} (${pSave.saves})`}</span> : null}
    </div>
  )
}

PostGameInfo.propTypes = propTypes
