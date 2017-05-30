
export const createDiamond = (offense) => {
  let file = 'diamond'
  if (!offense) return file
  if (offense.first) file += '_1b'
  if (offense.second) file += '_2b'
  if (offense.third) file += '_3b'
  return file
}

export const createBsoCount = (filled, max, state) => {
  if (!state || state === 'Middle' || state === 'End') {
    return fillCircles(0, max)
  } else {
    return fillCircles(filled, max)
  }
}

const fillCircles = (circlesFilled, maxCircles) => {
  let count = 0
  let result = ''
  while (count < circlesFilled) {
    result += '<span class="circle circleFilled"></span>'
    count += 1
  }
  while (count < maxCircles) {
    result += '<span class="circle"></span>'
    count += 1
  }
  return { __html: result }
}
