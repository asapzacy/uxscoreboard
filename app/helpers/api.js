import axios from 'axios'

export function formatDate() {
  const dt = new Date()
  const dd = ('0' + dt.getDate()).slice(-2)
  const mm = ('0' + (dt.getMonth() + 1)).slice(-2)
  const yyyy = dt.getFullYear()
  return [yyyy, mm, dd]
}



export function getMlbScores() {
  const dt = new Date()
  const dd = ('0' + dt.getDate()).slice(-2)
  const mm = ('0' + (dt.getMonth() + 1)).slice(-2)
  const yyyy = dt.getFullYear()
  const url = `http://gd2.mlb.com/components/game/mlb/year_2016/month_07/day_20/miniscoreboard.json`
  return axios.get(url)
    .then((currentScores) => currentScores.data)
    .catch((currentScores) => console.log(currentScores.status))
}


export function getMlbScores2() {
  const today = formatDate()
  const url = `http://gd2.mlb.com/components/game/mlb/year_${today[0]}/month_${today[1]}/day_${today[2]}/miniscoreboard.json`
  return axios.get(url)
    .then((currentScores) => currentScores.data)
    .catch((currentScores) => console.log(currentScores.status))
}

Date.prototype.yyyymmdd = function() {
  const dd = ('0' + this.getDate()).slice(-2)
  const mm = ('0' + (this.getMonth() + 1)).slice(-2)
  const yyyy = this.getFullYear()
  return [yyyy, mm, dd]
}

export function getMlbScores3() {
  const dt = new Date().yyyymmdd()
  const url = `http://gd2.mlb.com/components/game/mlb/year_${dt[0]}/month_${dt[1]}/day_${dt[2]}/miniscoreboard.json`
  return axios.get(url)
    .then((currentScores) => console.log(currentScores.data))
    .catch((currentScores) => console.log(currentScores.status))
}
