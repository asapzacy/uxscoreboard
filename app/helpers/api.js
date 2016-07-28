import axios from 'axios'
import moment from 'moment'

export function formatDateUrl(dt) {
  const yyyy = dt.getFullYear()
  const mm = ('0' + (dt.getMonth() + 1)).slice(-2)
  const dd = ('0' + dt.getDate()).slice(-2)
  return `${yyyy}${mm}${dd}`
}

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

export function getMlbStandings2() {
  const url = `https://erikberg.com/mlb/standings.json`
  return axios.get(url)
    .then((currentStandings) => currentStandings.data)
    .catch((currentStandings) => currentStandings.status)
}


export function formatDetailsDate(date) {
  return moment(new Date(date)).format('MMMM D, YYYY')
}

export function getMlbStandings() {
  const dt = moment().subtract(1, 'day').format('YYYYMMDD')
  const year = dt.slice(0,4)
  const month = dt.slice(4,6)
  const today = dt.slice(6,8)
  // const yesterday = moment(dt).subtract(1, 'days').format('DD')
  // const url = `http://mlb.mlb.com/lookup/json/named.standings_schedule_date.bam?season=2016&schedule_game_date.game_date=%272016/07/26%27&sit_code=%27h0%27&league_id=103&league_id=104&all_star_sw=%27N%27&version=2`
  // const url2 = 'http://mlb.mlb.com/lookup/json/named.standings_schedule_date.bam?season=2016&schedule_game_date.game_date=%272016/07/27%27&sit_code=%27h0%27&league_id=103&league_id=104&all_star_sw=%27N%27&version=2'


  const url = `http://mlb.mlb.com/lookup/json/named.standings_schedule_date.bam?season=${year}&schedule_game_date.game_date=%${today}${year}/${month}/${today}%${today}&sit_code=%${today}h0%${today}&league_id=103&league_id=104&all_star_sw=%${today}N%${today}&version=2`
  return axios.get(url)
    .then((currentStandings) => currentStandings.data)
    .catch((currentStandings) => currentStandings.status)
}
