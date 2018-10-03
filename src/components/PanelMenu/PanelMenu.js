import React from 'react'
import Panel from './Panel'
import s from './PanelMenu.scss'

const PanelMenu = ({ panels, activePanel, switchPanel }) => (
  <menu className={s.menu}>
    <ul className={s.list}>
      {panels.map((el, i) => (
        <Panel
          panel={el}
          isActive={el === activePanel}
          fn={switchPanel}
          key={i}
        />
      ))}
    </ul>
  </menu>
)

export default PanelMenu
