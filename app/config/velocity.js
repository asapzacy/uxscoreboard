

export const velocity = (direction = 'Up') => ({
  enter: {
    // animation: `transition.slide${direction}In`,
    // translateX: [ 0, -400 ],
    animation: `transition.slide${direction ? direction : 'Up'}BigIn`,
    duration: 440,
    delay: 220,
    display: 'initial'
  },
  leave: {
    animation: `transition.slide${direction === 'Left' ? 'Right' : direction === 'Right' ? 'Left' : direction}BigOut`,
    duration: 220,
    delay: 0,
  }
})
