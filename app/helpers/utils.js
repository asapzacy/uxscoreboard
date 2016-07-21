import moment from 'moment'

const monthsOfTheYear = {
  "1": "January",
  "2": "February",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "August",
  "9": "September",
  "10": "October",
  "11": "November",
  "12": "December"
}
export function formatDate(dt) {
  const dd = dt.day.charAt(0) === '0' ? dt.day.charAt(1) : dt.day
  const mm = dt.month.charAt(0) === '0' ? dt.month.charAt(1) : dt.month
  const yyyy = dt.year
  return `${monthsOfTheYear[mm]} ${dd}, ${yyyy}`
}



export function formatDetailsDate(date) {
  return moment(new Date(date)).format('MMMM D, YYYY')
}

export const runnersOnBase = (runners) => {
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
    result += '<span className={circleFilled}></span>'
    counter++
  }
  while (counter < numCircles) {
    result += '<span className={circle}></span>'
    counter++
  }
  return result
}
