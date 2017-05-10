
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
    const awayTeam = stats[item][0]
    const homeTeam = stats[item][1]
    if (String(awayTeam).includes('/') || String(homeTeam).includes('/')) {
      result += `<td>${awayTeam}</td>`
      result += `<td>${homeTeam}</td>`
    } else {
      result += awayTeam > homeTeam ? `<td><strong>${awayTeam}</strong></td>` : `<td>${awayTeam}</td>`
      result += awayTeam < homeTeam ? `<td><strong>${homeTeam}</strong></td>` : `<td>${homeTeam}</td>`
    }
    result += '</tr>'
  }
  result += '</tbody>'
  return { __html: result }
}
