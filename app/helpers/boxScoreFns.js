
// format table heading row
export const formatBoxScoreTableHead = (periods, totalPeriods, league, overtimes) => {
  const width = overtimes > 3 ? '25%' : overtimes ? '30%' : '40%'
  let result = `<thead><tr><th style="width:${width}"></th>`
  for (let i = 1; i <= periods; i++) {
    result += `<th>${i}</th>`
  }
  if (totalPeriods > periods) {
    for (let i = periods + 1; i <= totalPeriods; i++) {
      if (league === 'mlb') {
        result += `<th>${i}</th>`
      } else {
        result += `<th>${i > periods + 1 ? `${i - periods}OT` : 'OT'}</th>`
      }
    }
  }
  if (league === 'mlb') {
    result += '<th style="width:8px"></th>'
    result += '<th>R</th><th>H</th><th>E</th>'
  } else {
    result += '<th>T</th>'
  }
  result += '</tr></thead>'
  return { __html: result }
}

export const formatBoxScoreTableBodyRow = (team, score, side, linescore, periods, totalPeriods, league) => {
  let result = `<th>${team}</th>`
  const end = Math.max(periods, totalPeriods)
  for (let i = 0; i < end; i++) {
    if (league === 'nhl') {
      if (linescore[i]) {
        result += `<td>${linescore[i][side].goals}</td>`
      } else {
        result += '<td></td>'
      }
    }
    if (league === 'nba') {
      if (linescore[side][i] && i < totalPeriods) {
        result += `<td>${linescore[side][i].score}</td>`
      } else {
        result += '<td></td>'
      }
    }
    if (league === 'mlb') {
      if (linescore.inning[i][side]) {
        console.log(linescore.inning[i][side])
        result += `<td>${linescore.inning[i][side]}</td>`
      } else {
        result += '<td></td>'
      }
    }
  }
  if (league === 'mlb') {
    result += '<td></td>'
  }
  result += `<td><strong>${score}</strong></td>`
  if (league === 'mlb') {
    result += `<td><strong>${linescore.h[side]}</strong></td>`
    result += `<td><strong>${linescore.e[side]}</strong></td>`
  }
  return { __html: result }
}
