import React from 'react'
import { detailsContainer, locationInfo } from './styles.css'


export default function Details({venue, location}) {
  return (
    <div className={detailsContainer}>
      <div className={locationInfo}>
        <span>{location}</span>
        <span>{venue}</span>
      </div>


    </div>
  )
}
