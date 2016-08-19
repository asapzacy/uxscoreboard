import axios from 'axios'
import moment from 'moment'

export function formatDateUrl() {
  return moment().format('YYYYMMDD')
}

export function getMlbScores(dt) {
  if (dt === undefined)
    dt = formatDateUrl()
  const yyyy = dt.slice(0,4)
  const mm = dt.slice(4,6)
  const dd = dt.slice(6,8)
  const url = `http://gd2.mlb.com/components/game/mlb/year_${yyyy}/month_${mm}/day_${dd}/master_scoreboard.json`
  return axios.get(url)
    .then((currentScores) => currentScores.data)
    .catch((currentScores) => currentScores.status)
}

export function getMlbStandings() {
  const dt = moment().format('YYYYMMDD')
  const year = dt.slice(0,4)
  const month = dt.slice(4,6)
  const today = dt.slice(6,8)
  const url = `http://mlb.mlb.com/lookup/json/named.standings_schedule_date.bam?season=${year}&schedule_game_date.game_date=%27${year}/${month}/${today}%27&sit_code=%27h0%27&league_id=103&league_id=104&all_star_sw=%27N%27&version=2`
  return axios.get(url)
    .then((currentStandings) => currentStandings.data)
    .catch((currentStandings) => currentStandings.status)
}
