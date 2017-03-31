import React from 'react'
import AngleDown from 'react-icons/lib/fa/angle-down'
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import ArrowDown from 'react-icons/lib/io/ios-arrow-down'
import { iconContainer, expandedIcon, icon } from './styles.css'

const Expand = ({ expanded, showDetails }) => (
  <span className={expanded ? expandedIcon : iconContainer} onClick={showDetails}>
    <span className={icon}><AngleDown /><MdKeyboardArrowDown /><ArrowDown /></span>
  </span>
)

export default Expand
