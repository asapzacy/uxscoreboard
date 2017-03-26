import React from 'react'
import AngleDown from 'react-icons/lib/fa/angle-down'
import { iconContainer, expandedIcon, icon } from './styles.css'

const Expand = ({ expanded, showDetails }) => (
  <span className={expanded ? expandedIcon : iconContainer} onClick={showDetails}>
    <span className={icon}><AngleDown /></span>
  </span>
)

export default Expand
