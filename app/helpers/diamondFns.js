
export const createDiamondImage = (runners) => {
  let file = 'diamond'
  if (!runners) return file
  if (runners.runner_on_1b) file += '_1b'
  if (runners.runner_on_2b) file += '_2b'
  if (runners.runner_on_3b) file += '_3b'
  return file
}

const fillCircles = (numCircles, numFilled) => {
  let count = 0
  let result = ''
  while (count < numFilled) {
    result += '<span class="circle circleFilled"></span>'
    count += 1
  }
  while (count < numCircles) {
    result += '<span class="circle"></span>'
    count += 1
  }
  return { __html: result }
}

export const ballsCount = (balls, maxBalls, inningState) => {
  if (!inningState || inningState === 'Middle' || inningState === 'End') {
    return fillCircles(maxBalls, 0)
  } else {
    return fillCircles(maxBalls, Number(balls))
  }
}
