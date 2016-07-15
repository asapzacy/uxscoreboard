import axios from 'axios'

export function getMlbScores() {
  const dt = new Date()
  const dd = ('0' + dt.getDate()).slice(-2)
  const mm = ('0' + (dt.getMonth() + 1)).slice(-2)
  const yyyy = dt.getFullYear()
  const url = `http://gd2.mlb.com/components/game/mlb/year_2016/month_07/day_01/master_scoreboard.json`
  return axios.get(url)
    .then((currentScores) => currentScores.data)
    .catch((currentScores) => currentScores.status)
}
