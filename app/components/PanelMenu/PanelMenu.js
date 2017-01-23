import React from 'react'
import { panelMenu, panelList, panelItem, activated } from './styles.css'

export default function PanelMenu({ panel, switchPanel }) {
  return (
    <menu className={panelMenu}>
      <ul className={panelList}>
        <li className={panel === 'boxScore' ? activated : panelItem} onClick={() => switchPanel('boxScore')}>{'box score'}</li>
        <li className={panel === 'teamStats' ? activated : panelItem} onClick={() => switchPanel('teamStats')}>{'team stats'}</li>
        <li className={panel === 'playByPlay' ? activated : panelItem} onClick={() => switchPanel('playByPlay')}>{'play-by-play'}</li>
      </ul>
    </menu>
  )
}
