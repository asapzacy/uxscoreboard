import React from 'react'
import { createDiamond } from 'helpers/baseball'
import s from './diamond.scss'

const BaseballField = ({ offense }) => (
  <img className={s.baseballField} src={`/assets/img/mlb/other/${createDiamond(offense)}.svg`} />
)

export default BaseballField
