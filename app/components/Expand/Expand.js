import React from 'react'
import ArrowDown from 'react-icons/lib/io/ios-arrow-down'
import { iconContainer, expandedIcon, icon } from './styles.css'

const Expand = ({ expanded, showDetails }) => (
  <span className={expanded ? expandedIcon : iconContainer}>
    <span className={icon}><ArrowDown /></span>
  </span>
)

export default Expand
