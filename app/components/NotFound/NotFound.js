import React from 'react'
import s from './NotFound.scss'

const goBack = () => window.history.go(-1)

const NotFound = () => (
  <article className={s.container}>
    <span onClick={() => window.history.go(-1)}>{'Mr. Robot wouldn\'t go back'}</span>
  </article>
)

export default NotFound
