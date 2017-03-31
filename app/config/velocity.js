
export const velocity_home = {
  enter: {
    animation: 'fadeIn',
    duration: 440,
    delay: 0,
    display: 'block',
  },
  runOnMount: true,
  component: 'main',
  leave: {
    animation: 'slideUp',
    duration: 220,
    delay: 220,
    display: 'block'

  }
}

export const velocity_game = {
  enter: {
    animation: 'slideDown',
    duration: 220,
    delay: 0
  },
  leave: {
    animation: 'slideUp',
    duration: 220,
    delay: 220
  }
}

export const velocity_scoreboard = (direction) => ({
  enter: {
    animation: `transition.slide${direction.enter}${direction.enter !== 'Up' ? 'Big' : ''}In`,
    duration: direction.enter === 'Up' ? 1440 : 480,
    delay: direction.enter === 'Up' ? 0 : 316,
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
    duration: 480,
    delay: 0,
    display: 'none',
    style: {
      position: 'absolute'
    }
  }
})
