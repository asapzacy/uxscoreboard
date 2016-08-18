import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Loading } from 'components'
import { container, filterList, filterItem, standingsContainer, teamsContainer,
  table, headingRow, header, logo, name } from './styles.css'
import teamColors from './teams.css'



export default function StandingsUI({standings, filter}) {
  var al        = standings[1].queryResults.row,
      nl        = standings[0].queryResults.row,
      both      = al.concat(nl),
      alWest    = al.filter((team) => team.division_id === '200'),
      alEast    = al.filter((team) => team.division_id === '201'),
      alCentral = al.filter((team) => team.division_id === '202'),
      nlWest    = nl.filter((team) => team.division_id === '203'),
      nlEast    = nl.filter((team) => team.division_id === '204'),
      nlCentral = nl.filter((team) => team.division_id === '205')
  return (
    <div className={standingsContainer}>
      <ul className={filterList}>
        <li><Link to={'/mlb/standings/division'} className={filterItem} activeClassName='active'>{'division'}</Link></li>
        <li><Link to={'/mlb/standings/league'} className={filterItem} activeClassName='active'>{'league'}</Link></li>
        <li><Link to={'/mlb/standings/overall'} className={filterItem} activeClassName='active'>{'overall'}</Link></li>
        <li><Link to={'/mlb/standings/wc'} className={filterItem} activeClassName='active'>{'wild card'}</Link></li>
      </ul>
      { filter === 'division'
        ? <div className={teamsContainer}>
            <Table heading={'al east'} data={alEast} />
            <Table heading={'al central'} data={alCentral} />
            <Table heading={'al west'} data={alWest} />
            <span style={{display:'block', width:'100%'}}></span>
            <Table heading={'nl east'} data={nlEast} />
            <Table heading={'nl central'} data={nlCentral} />
            <Table heading={'nl west'} data={nlWest} />
          </div>
        : filter === 'league'
          ? <div className={teamsContainer}>
              <Table heading={'american'} data={al} />
              <Table heading={'national'} data={nl} />
            </div>
          : filter === 'overall'
            ? <div className={teamsContainer}>
                <Table heading={'overall'} data={both} />
              </div>
            : null
      }
    </div>
  )
}

export default function Table({heading, data}) {
  return (
    <div className={table}>
      <div className={headingRow}>
        <span className={header}>{heading}</span>
        <span style={{flexBasis:'13%',visibility:'hidden'}}></span>
        <span>{'w'}</span>
        <span>{'l'}</span>
        <span>{'%'}</span>
        <span>{'gb'}</span>
      </div>
      { data.sort((a,b) => b.pct - a.pct).map((item) => (
        <TeamRow
          key={item.team_id}
          team={item.team_short}
          code={item.file_code}
          ws={item.w}
          ls={item.l}
          pct={item.pct}
          gb={item.gb}
        />
      ))}
    </div>
  )
}
export default function TeamRow({team, code, ws, ls, pct, gb}) {
  return (
    <div className={teamColors[code]}>
      <img className={logo} src={`assets/img/mlb/teams/${code}.svg`} alt={team} />
      <span className={name}>{team}</span>
      <span>{ws}</span>
      <span>{ls}</span>
      <span>{pct}</span>
      <span>{gb}</span>
    </div>
  )
}

export default function Standings(props) {
  return (
    <div>
      {props.isLoading === true
        ? <Loading speed={400} text={'Loading'} />
        : <StandingsUI
            standings={props.standings}
            filter={props.filter}
          />
      }
    </div>
  )
}

Standings.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}
