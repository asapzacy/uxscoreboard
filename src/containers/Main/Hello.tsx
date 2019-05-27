import * as React from 'react'
import Goodbye from './Goodbye'

export interface HelloProps {
  compiler: string
  framework: string
}

const Hello = (props: HelloProps) =>
  console.log(props) || (
    <h1>
      <Goodbye name={100} />
      Hello from {props.compiler} and {props.framework}!
    </h1>
  )

export default Hello
