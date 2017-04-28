
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
    result += '<th style="width:6px"></th>'
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
      let score
      if (linescore[i]) {
        score = linescore[i][side].goals !== '' ? Number(linescore[i][side].goals) : ''
        result += score ? `<td><strong>${score}</strong></td>` : `<td>${score}</td>`
      } else {
        result += '<td></td>'
      }
    }
    if (league === 'nba') {
      if (linescore[side]) {
        if (linescore[side][i] && i < totalPeriods) {
          const score = linescore[side][i].score
          const opponentsScore = linescore[side === 'home' ? 'away' : 'home'][i].score
          result += score > opponentsScore ? `<td><strong>${score}</strong></td>` : `<td>${score}</td>`
        } else {
          result += '<td></td>'
        }
      } else {
        result += '<td></td>'
      }
    }
    if (league === 'mlb') {
      let score
      if (linescore.innings && linescore.innings[i]) {
        if (linescore.innings[i][side]) {
          score = linescore.innings[i][side].runs >= 0 ? linescore.innings[i][side].runs : ''
          result += score > 0 ? `<td><strong>${score}</strong></td>` : `<td>${score}</td>`
        } else {
          result += '<td></td>'
        }
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
    if (linescore && linescore.teams[side].hits >= 0 && linescore.teams[side].errors >= 0) {
      result += `<td>${linescore.teams[side].hits}</td>`
      result += `<td>${linescore.teams[side].errors}</td>`
    } else {
      result += '<td></td>'
      result += '<td></td>'
    }
  }
  return { __html: result }
}
