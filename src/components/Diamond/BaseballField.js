import React from 'react'
import { createDiamond } from 'utils/baseball'
import s from './BaseballField.scss'

const BaseballField = ({ offense }) => (
  <img className={s.baseballField} src={`/assets/public/img/mlb/other/${createDiamond(offense)}.svg`} />
)

export default BaseballField
