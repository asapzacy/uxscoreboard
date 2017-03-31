import moment from 'moment'
import timezone from 'moment-timezone/builds/moment-timezone.min'

moment.tz.add("America/New_York|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 11B0 1qL0 1a10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x40 iv0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6")

export const getTodaysDate = () => moment().format('YYYYMMDD')

export const isValidDate = (dt) => dt.length === 8 && Number.isInteger(Number(dt))

export const checkDay = (day, start, end) => (day >= start) && (day <= end)

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
