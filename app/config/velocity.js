

export const velocity = (direction = 'Up') => ({
  enter: {
    animation: `transition.slide${direction ? direction : 'Up'}In`,
    duration: 440,
    delay: 220,
    display: 'initial'
  },
  leave: {
    animation: `transition.slide${direction === 'Left' ? 'Right' : direction === 'Right' ? 'Left' : direction}Out`,
    duration: 220,
    delay: 0,
  }
})
