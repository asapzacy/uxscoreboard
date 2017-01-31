import moment from 'moment'
import timezone from 'moment-timezone'


export const getTodaysDate = () => moment().format('YYYYMMDD')

export const isValidDate = (dt) => dt.length === 8 && Number.isInteger(Number(dt))

// check if date is in season
// if not - return date closest to start of next season or end of last season
// TODO: add next season start dates !!
export const isInSeason = (dt, start, end) => {
  if (dt >= start && dt <= end) return dt
  if (Math.abs(dt - start) <= Math.abs(dt - end)) return start
  if (Math.abs(dt - end) <= Math.abs(dt - start)) return end
  return dt
}


export const shortenTeamName = (name) => {
  switch(name) {
    case 'Blue Jackets':  return 'Jackets'
    case 'Maple Leafs':   return 'Leafs'
    case 'Metropolitan':  return 'Metro'
    case 'Timberwolves':  return 'T-Wolves'
    case 'Trail Blazers': return 'Blazers'
    default:              return name
  }
}

// export const isInSeason = (dt, start, end) => dt >= start && dt <= end
export const isNotInSeason = (dt, start, end) => dt >= start && dt <= end


export function formatDateUrl() {
  return moment().format('YYYYMMDD')
}

export function formatDateStr(dt) {
  return moment(dt).format('MMMM D, YYYY')
}

export function formatTimezone(time) {
  return moment(time).tz('America/New_York').format('h:mm A')
}

export function inningSuffix(inning) {
  switch (inning) {
    case '1' || '21': return 'st'
    case '2' || '22': return 'nd'
    case '3' || '23': return 'rd'
    default: return 'th'
  }
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
