import React from 'react'
import AngleDown from 'react-icons/lib/fa/angle-down'
import { iconContainer, expandedIcon, icon } from './styles.css'

export default function Expand({ expanded, showDetails }) {
  return (
    <span className={expanded ? expandedIcon : iconContainer} onClick={showDetails}>
      <span className={icon}><AngleDown /></span>
    </span>
  )
}
