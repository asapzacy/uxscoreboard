
// format table heading row
export const formatTableHeaderRow = (periods, totalPeriods) => {
  let result = '<th></th>'
  for (let i = 1; i <= periods; i++) {
    result += `<th>${i}</th>`
  }
  if (totalPeriods > periods) {
    for (let i = periods + 1; i <= totalPeriods; i++) {
      result += `<th>${i > periods + 1 ? `${i - periods}OT` : 'OT'}</th>`
    }
  }
  result += '<th>T</th>'
  return { __html: result }
}

export const formatTableBodyRow = (team, score, side, linescore, periods, totalPeriods, league) => {
  let result = `<th>${team}</th>`
  for (let i = 0; i < Math.max(periods, totalPeriods); i++) {
    if (league === 'nhl') {
      if (linescore[i]) {
        result += `<td>${linescore[i][side].goals}</td>`
      } else {
        result += `<td></td>`
      }
    }
    if (league === 'nba') {
      if (linescore[side][i]) {
        result += `<td>${linescore[side][i].score}</td>`
      } else {
        result += `<td></td>`
      }
    }
  }
  result += `<td>${score}</td>`
  return { __html: result }
}
