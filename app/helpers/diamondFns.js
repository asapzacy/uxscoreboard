
export const createDiamondImage = (runners) => {
  let file = 'diamond'
  if (!runners) return file
  if (runners.runner_on_1b) file += '_1b'
  if (runners.runner_on_2b) file += '_2b'
  if (runners.runner_on_3b) file += '_3b'
  return file
}

const fillCircles = (numCircles, numFilled) => {
  let counter = 0
  let result = ''
  while (counter < numFilled) {
    result += '<span class="circle circleFilled"></span>'
    counter++
  }
  while (counter < numCircles) {
    result += '<span class="circle"></span>'
    counter++
  }
  return { __html: result }
}

export const ballsCount = (balls, inningState) => {
  if (inningState === 'Middle' || inningState === 'End')
    return fillCircles(4, 0)
  else if (balls === '1')
    return fillCircles(4, 1)
  else if (balls === '2')
    return fillCircles(4, 2)
  else if (balls === '3')
    return fillCircles(4, 3)
  else if (balls === '4')
    return fillCircles(4, 4)
  else
    return fillCircles(4, 0)
}

export const strikesOutsCount = (strikesOuts, inningState) => {
  if (inningState === 'Middle' || inningState === 'End')
    return fillCircles(3, 0)
  else if (strikesOuts === '1')
    return fillCircles(3, 1)
  else if (strikesOuts === '2')
    return fillCircles(3, 2)
  else if (strikesOuts === '3')
    return fillCircles(3, 3)
  else
    return fillCircles(3, 0)
}
