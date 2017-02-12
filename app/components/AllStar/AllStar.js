import React from 'react'
import {  } from './styles.css'

export default function AllStar({ league, img }) {
  return (
    <img src={`/assets/img/${league}/other/${img}.svg`} />
  )
}
