
export const formatStatsTableHeaderRow = (teams) => {
  let result = '<th></th>'
  for (let i = 0; i < teams.length; i++) {
    result += `<th>${teams[i]}</th>`
  }
  return { __html: result }
}


export const formatStatsTableBody = (stats) => {
  let result = '<tbody>'
  for (let item in stats) {
    if (item !== 'Teams') {
      result += '<tr>'
      result += `<th>${item}</th>`
      for (let i = 0; i < stats[item].length; i++) {
        result += `<td>${stats[item][i]}</td>`
      }
      result += '</tr>'
    }
  }
  result += '</tbody>'
  return { __html: result }
}
