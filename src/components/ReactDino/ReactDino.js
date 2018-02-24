import React, { Fragment } from 'react'
import { Spinner } from 'components'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import s from './PreComponent.scss'

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
