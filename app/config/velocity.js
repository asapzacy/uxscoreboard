

export const velocity = (direction) => ({
  enter: {
    animation: `transition.slide${direction.enter}${direction.enter !== 'Up' ? 'Big' : ''}In`,
    duration: direction.enter === 'Up' ? 1220 : 880,
    delay: direction.enter === 'Up' ? 0 : 580,
    display: 'flex',
    style: {
      position: 'relative',
      top: 0,
      left: 0,
      right: 0
    }
  },
  runOnMount: true,
  leave: {
    animation: `transition.slide${direction.leave}BigOut`,
    duration: 880,
    display: 'none',
    style: {
      position: 'absolute'
    }
  }
})
