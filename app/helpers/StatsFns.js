
export const formatStatsTableHead = (teams) => {
  let result = '<thead><tr><th></th>'
  for (let i = 0; i < teams.length; i++) {
    result += `<th>${teams[i]}</th>`
  }
  result += '</tr></thead>'
  return { __html: result }
}


export const formatStatsTableBody = (stats) => {
  let result = '<tbody>'
  for (let item in stats) {
    result += `<tr><th>${item}</th>`
    for (let i = 0; i < stats[item].length; i++) {
      result += `<td>${stats[item][i]}</td>`
    }
    result += '</tr>'
  }
  result += '</tbody>'
  return { __html: result }
}
