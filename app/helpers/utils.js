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
  const yyyy = dt.slice(0, 4)
  const mm = dt.charAt(4) === '0' ? dt.charAt(5) : dt.slice(4, 6)
  const dd = dt.charAt(6) === '0' ? dt.charAt(7) : dt.slice(6, 8)
  const month = monthsOfTheYear[mm]
  return `${month} ${dd}, ${yyyy}`
}
