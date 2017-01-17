import React from 'react'
import Loading from 'react-loading-animation'
import { loadingContainer, svgContainer, svg, svgPath } from './styles.css'

export default function Test() {
  return (
    <div className={loadingContainer}>
      <div className={svgContainer}>
        <svg className={svg} viewBox={'25 25 50 50'}>
          <circle className={svgPath} cx={50} cy={50} r={20} fill={'none'} strokeWidth={2} strokeMiterlimit={10} />
        </svg>
      </div>
    </div>
  )
}
