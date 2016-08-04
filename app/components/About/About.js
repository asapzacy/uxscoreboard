import React from 'react'
import { aboutContainer, header, info } from './styles.css'

export default function About() {
  return (
    <div className={aboutContainer}>
      <h1 className={header}>{'about'}</h1>
      <p className={info}>{`Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nunc feugiat risus libero, et tincidunt diam vestibulum at.
        Integer volutpat efficitur libero, non malesuada lorem hendrerit at.
        Etiam posuere tincidunt mauris ac semper. Praesent condimentum ipsum
        sit amet eros placerat, in rhoncus dui feugiat. Curabitur pretium tortor
        eros, id consequat libero pretium eget. Aenean eleifend finibus elit a
        ornare. Sed et feugiat velit. Nulla ultrices ullamcorper nisi, sed mollis
        eros auctor non. Phasellus pulvinar neque a dui ultrices, et pretium enim
        cursus. Aenean maximus mi nunc, lacinia elementum metus interdum ut. Sed
        dapibus semper velit non fringilla. Quisque vel ante dolor. Sed fringilla
        augue tortor, et finibus nulla iaculis cursus.`}</p>
    </div>
  )
}
