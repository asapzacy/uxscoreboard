import moment from 'moment'
import timezone from 'moment-timezone'

// date defaults to today
export const getTodaysDate = () => moment().format('YYYYMMDD')

// checks if data param is string of 8 numbers
export const isValidDate = dt => !!Number(dt) && dt.length === 8

// check if date is in season
// if not - return date closest to start of next season or end of last season
// TODO: add next season start dates !!
export const isInSeason = (dt, start, end) => {
  if (dt >= start && dt <= end) return dt
  if (Math.abs(dt - start) <= Math.abs(dt - end)) return start
  if (Math.abs(dt - end) <= Math.abs(dt - start)) return end
  return dt
}

// export const isInSeason = (dt, start, end) => dt >= start && dt <= end


export function formatDateUrl() {
  return moment().format('YYYYMMDD')
}

export function formatDateStr(date) {
  const dt = moment(date)
  const yyyy = dt.format('YYYY')
  const mm = dt.format('MMMM')
  const dd =  dt.format('Do').match(/([0-9]+)([a-z]+)/)
  const result = `${mm} ${dd[1]}<sup>${dd[2]}</sup>, ${yyyy}`
  return { __html: result }
}

export function formatTime(time) {
  let hh = time.slice(0, 2)
  const mm = time.slice(2, 4)
  if (hh > 12) hh -= 12
  return `${hh}:${mm}`
}

export function formatTimezone(time) {
  return moment(time).timezone('America/New_York').format('h:mm A')
}

export function inningSuffix(inning) {
  switch (inning) {
    case '1' || '21': return 'st'
    case '2' || '22': return 'nd'
    case '3' || '23': return 'rd'
    default: return 'th'
  }
}

export function baseRunners(runners) {
  let img = '0b'
  if (runners.runner_on_1b)
    img += '1b'
  if (runners.runner_on_2b)
    img += '2b'
  if (runners.runner_on_3b)
    img += '3b'
  return img
}

export function ballCount(balls, inningState) {
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

export function strikeOutCount(strikesOuts, inningState) {
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

const fillCircles = (numCircles, numFilled) => {
  let counter = 0, result = ''
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
