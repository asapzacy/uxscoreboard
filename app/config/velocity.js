
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
    animation: `transition.slide${direction.enter ? direction.enter : 'Up'}${direction.enter ? 'Big' : ''}In`,
    duration: !direction.enter ? 1440 : 480,
    delay: !direction.enter ? 0 : 316,
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
    animation: `transition.slide${direction.leave ? direction.leave : 'Down'}BigOut`,
    duration: 480,
    delay: 0,
    display: 'none',
    style: {
      position: 'absolute'
    }
  }
})
