import React from 'react'
import { FaAngleDown } from 'react-icons/lib/fa'
import { iconContainer, expandedIcon, icon } from './styles.css'

export default function Expand({ expanded, showDetails }) {
  return (
    <span className={expanded ? expandedIcon : iconContainer} onClick={showDetails}>
      <span className={icon}><FaAngleDown /></span>
    </span>
  )
}
