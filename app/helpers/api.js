import axios from 'axios'

export function getMlbScores(dt) {
  if (dt === undefined)
    dt = formatDateUrl(new Date())
  const yyyy = dt.slice(0,4)
  const mm = dt.slice(4,6)
  const dd = dt.slice(6,8)
  const url = `http://gd2.mlb.com/components/game/mlb/year_${yyyy}/month_${mm}/day_${dd}/master_scoreboard.json`
  return axios.get(url)
    .then((currentScores) => currentScores.data)
    .catch((currentScores) => currentScores.status)
}

export function formatDateUrl(dt) {
  const yyyy = dt.getFullYear()
  const mm = ('0' + (dt.getMonth() + 1)).slice(-2)
  const dd = ('0' + dt.getDate()).slice(-2)
  return `${yyyy}${mm}${dd}`
}
