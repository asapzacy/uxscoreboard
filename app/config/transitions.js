

// export const transitions = (direction) => ({
//   component: 'section',
//   className: '',
//   transitionName: {
//     appear: 'appear',
//     appearActive: 'appearActive',
//     enter: direction === 'Left' ? 'leftEnter' : 'rightEnter',
//     enterActive: direction === 'Left' ? 'leftEnterActive' : 'rightEnterActive',
//     leave: direction === 'Left' ? 'rightLeave' : 'leftLeave',
//     leaveActive: direction === 'Left' ? 'rightLeaveActive' : 'leftLeaveActive'
//   },
//   transitionAppear: true,
//   transitionAppearTimeout: 6000,
//   transitionEnterTimeout: 1200,
//   transitionLeaveTimeout: 1200
// })

export const transitions = (direction, styles) => ({
  component: 'section',
  className: '',
    transitionName: {
      appear: 'appear',
      appearActive: 'appearActive',
      enter: direction.enter === 'Left' ? 'leftEnter' : 'rightEnter',
      enterActive: direction.enter === 'Left' ? 'leftEnterActive' : 'rightEnterActive',
      leave: direction.leave === 'Left' ? 'rightLeave' : 'leftLeave',
      leaveActive: direction.leave === 'Left' ? 'rightLeaveActive' : 'leftLeaveActive'
    },
  transitionAppear: true,
  transitionAppearTimeout: 660,
  transitionEnterTimeout: 4000,
  transitionLeaveTimeout: 4000
})
