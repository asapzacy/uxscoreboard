import * as React from 'react'

export interface GoodbyeProps {
  name: string
}

const Goodbye = (props: GoodbyeProps) =>
  console.log(props) || <h1>Goodbye {props.name}!</h1>

export default Goodbye
