
// format table heading row
export const formatTableHeaderRow = (prds, ots) => {
  let result = '<th></th>'
  for (let i = 1; i <= prds; i++) {
    result += `<th>${i}</th>`
  }
  if (ots > 0) {
    for (let i = 1; i <= ots; i++) {
      result += `<th>${i > 1 ? `${i}ot` : 'ot'}</th>`
    }
  }
  result += '<th>t</th>'
  return { __html: result }
}

export const formatTableBodyRow = (team, score, side, linescore, prds, totalPrds) => {
  let result = `<th>${team}</th>`
  const higher = Math.max(prds,totalPrds)
  for (let i = 0; i < higher; i++) {
    if (linescore[i]) {
      result += `<td>${linescore[i][`${side}`].goals}</td>`
    } else {
      result += `<td></td>`
    }
  }
  result += `<td>${score}</td>`
  return { __html: result }
}
