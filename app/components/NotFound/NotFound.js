import React from 'react'
import { notFoundContainer } from './styles.css'

const goBack = () => window.history.go(-1)

const NotFound = () => (
  <section className={notFoundContainer}>
    <span onClick={() => window.history.go(-1)}>{'<-- go back to safety'}</span>
  </section>
)

export default NotFound
