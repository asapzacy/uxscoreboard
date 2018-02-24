import React, { Fragment } from 'react'
import { Spinner } from 'components'
import s from './ReactDino.scss'

const ReactDino = ({ alignTop, size, children }) => {
  return (
    <Fragment>
      <span className={alignTop ? s.alignTop : s.container} style={{ fontSize: `${size}em` }}>
        <Spinner />
      </span>
      {children}
    </Fragment>
  )
}

export default ReactDino
