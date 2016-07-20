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

export function formatDetailsDate(date) {
  return moment(new Date(date)).format('MMMM D, YYYY')
}

export function formatDate(dt) {
  const dd = dt.day.charAt(0) === '0' ? dt.day.charAt(1) : dt.day
  const mm = dt.month.charAt(0) === '0' ? dt.month.charAt(1) : dt.month
  const yyyy = dt.year
  return `${monthsOfTheYear[mm]} ${dd}, ${yyyy}`
}
