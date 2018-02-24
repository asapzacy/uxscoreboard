import React from 'react'
import s from './Spinner.scss'

const Spinner = ({ isInput, styles = {} }) => (
  <span className={isInput ? s.input : s.spinner} style={styles} />
)

export default Spinner
