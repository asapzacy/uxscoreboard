
export const createDiamondImage = (offense) => {
  let file = 'diamond'
  if (!offense) return file
  if (offense.first) file += '_1b'
  if (offense.second) file += '_2b'
  if (offense.third) file += '_3b'
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
