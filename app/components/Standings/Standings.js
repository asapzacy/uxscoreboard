import React, { Component, PropTypes } from 'react'
import { header, standingsContainer, teamsContainer,
  teamContainer, columnHeadings, table } from './styles.css'

export default function StandingsUI({date, standings}) {
  var al = standings[0].queryResults.row
  var nl = standings[1].queryResults.row
  var combined = al.concat(nl)
  return (
    <div className={standingsContainer}>
      <table className={table}>
        <thead className={columnHeadings}>
          <tr>
            <th>{'team'}</th>
            <th>{'wins'}</th>
            <th>{'losses'}</th>
            <th>{'%'}</th>
            <th>{'gb'}</th>
            <th>{'home'}</th>
            <th>{'away'}</th>
            <th>{'rs'}</th>
            <th>{'rs'}</th>
            <th>{'diff'}</th>
            <th>{'streak'}</th>
            <th>{'last 10'}</th>
          </tr>
        </thead>
        <tbody>
          {standings === undefined
            ? <h1>{'no standings'}</h1>
            : combined.map((item) => <Team key={item.team_id} data={item} /> )
          }
        </tbody>
      </table>
    </div>
  )
}

export default function Standings(props) {
  return (
    <div>
      {props.isLoading === true
        ? <h1 className={header}>{'Loading...'}</h1>
        : <StandingsUI standings={props.standings} />
      }
    </div>
  )
}

Standings.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

class Team extends Component {
  render() {
    let teamData = this.props.data
    return (
      <tr className={teamContainer}>
        <td>{teamData.team_full}</td>
        <td>{teamData.w}</td>
        <td>{teamData.l}</td>
        <td>{teamData.pct}</td>
        <td>{teamData.gb}</td>
        <td>{teamData.home}</td>
        <td>{teamData.away}</td>
        <td>{teamData.runs}</td>
        <td>{teamData.opp_runs}</td>
        <td>{teamData.streak}</td>
        <td>{teamData.last_ten}</td>
      </tr>
    )
  }
}
