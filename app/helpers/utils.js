import moment from 'moment'

export function formatDetailsDate(date) {
  return moment(new Date(date)).format('MMMM D, YYYY')
}

export let runnersOnBase = (runners) => {
  let img = '0b'
  if (runners.runner_on_1b)
    img += '1b'
  if (runners.runner_on_2b)
    img += '2b'
  if (runners.runner_on_3b)
    img += '3b'
  return img
}

export const ballCount = (ball, inningState) => {
  if (inningState === 'Middle' || inningState === 'End')
    return fillCircles(4, 0)
  else if (ball === '1')
    return fillCircles(4, 1)
  else if (ball === '2')
    return fillCircles(4, 2)
  else if (ball === '3')
    return fillCircles(4, 3)
  else if (ball === '4')
    return fillCircles(4, 4)
  else
    return fillCircles(4, 0)
}

export const strikeAndOutCount = (strikeOrOut, inningState) => {
  if (inningState === 'Middle' || inningState === 'End')
    return fillCircles(3, 0)
  else if (strikeOrOut === '1')
    return fillCircles(3, 1)
  else if (strikeOrOut === '2')
    return fillCircles(3, 2)
  else if (strikeOrOut === '3')
    return fillCircles(3, 3)
  else
    return fillCircles(3, 0)
}

const fillCircles = (numCircles, numFilled) => {
  var counter = 0
  var result = ''
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
