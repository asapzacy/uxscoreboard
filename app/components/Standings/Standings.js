import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Loading } from 'components'
import { header, standingsContainer, row, teamLogo, filterRow, nyy,
  xLarge, large, medium, xxLarge, filterList, filterItem, loadingContainer } from './styles.css'

class TeamRow extends React.Component {
  render() {
    let teamData = this.props.team
    var teamColors = {
      ana: [{ backgroundImage: '-webkit-linear-gradient(0deg, #ba0021 20%, transparent 0%)' }],
      ari: [{ backgroundImage: '-webkit-linear-gradient(0deg, #000000 20%, transparent 0%)' }],
      atl: [{ backgroundImage: '-webkit-linear-gradient(0deg, #13274f 20%, transparent 0%)' }],
      bal: [{ backgroundImage: '-webkit-linear-gradient(0deg, #000000 20%, transparent 0%)' }],
      bos: [{ backgroundImage: '-webkit-linear-gradient(0deg, #0d2b56 20%, transparent 0%)' }],
      chc: [{ backgroundImage: '-webkit-linear-gradient(0deg, #0e3386 20%, transparent 0%)' }],
      cin: [{ backgroundImage: '-webkit-linear-gradient(0deg, #c6011f 20%, transparent 0%)' }],
      cle: [{ backgroundImage: '-webkit-linear-gradient(0deg, #002b5c 20%, transparent 0%)' }],
      col: [{ backgroundImage: '-webkit-linear-gradient(0deg, #c4ced4 20%, transparent 0%)' }],
      cws: [{ backgroundImage: '-webkit-linear-gradient(0deg, #c4ced4 20%, transparent 0%)' }],
      det: [{ backgroundImage: '-webkit-linear-gradient(0deg, #ffffff 20%, transparent 0%)' }],
      hou: [{ backgroundImage: '-webkit-linear-gradient(0deg, #002d62 20%, transparent 0%)' }],
      kc:  [{ backgroundImage: '-webkit-linear-gradient(0deg, #ffffff 20%, transparent 0%)' }],
      la:  [{ backgroundImage: '-webkit-linear-gradient(0deg, #ffffff 20%, transparent 0%)' }],
      mia: [{ backgroundImage: '-webkit-linear-gradient(0deg, #0077c8 20%, transparent 0%)' }],
      mil: [{ backgroundImage: '-webkit-linear-gradient(0deg, #0a2351 20%, transparent 0%)' }],
      min: [{ backgroundImage: '-webkit-linear-gradient(0deg, #d31145 20%, transparent 0%)' }],
      nym: [{ backgroundImage: '-webkit-linear-gradient(0deg, #002d72 20%, transparent 0%)' }],
      nyy: [{ null }],
      oak: [{ backgroundImage: '-webkit-linear-gradient(0deg, #003831 20%, transparent 0%)' }],
      phi: [{ backgroundImage: '-webkit-linear-gradient(0deg, #e81828 20%, transparent 0%)' }],
      pit: [{ backgroundImage: '-webkit-linear-gradient(0deg, #fdb827 20%, transparent 0%)' }],
      sd:  [{ backgroundImage: '-webkit-linear-gradient(0deg, #7f411c 20%, transparent 0%)' }],
      sea: [{ backgroundImage: '-webkit-linear-gradient(0deg, #005c5c 20%, transparent 0%)' }],
      sf:  [{ backgroundImage: '-webkit-linear-gradient(0deg, #000000 20%, transparent 0%)' }],
      stl: [{ backgroundImage: '-webkit-linear-gradient(0deg, #c41e3a 20%, transparent 0%)' }],
      tb:  [{ backgroundImage: '-webkit-linear-gradient(0deg, #8fbce6 20%, transparent 0%)' }],
      tex: [{ backgroundImage: '-webkit-linear-gradient(0deg, #003278 20%, transparent 0%)' }],
      tor: [{ backgroundImage: '-webkit-linear-gradient(0deg, #134a8e 20%, transparent 0%)' }],
      was: [{ backgroundImage: '-webkit-linear-gradient(0deg, #ab0003 20%, transparent 0%)' }]
    }
    return (
      <div className={teamData.file_code === 'nyy' ? nyy : row} style={teamColors[`${teamData.file_code}`][0]}>
        <img className={teamLogo} src={`assets/img/mlb/teams/${teamData.file_code}.svg`} alt={teamData.team_full} />
        <span className={xLarge}>{teamData.team_short}</span>
        <span className={medium}>{teamData.w}</span>
        <span className={medium}>{teamData.l}</span>
        <span className={medium}>{teamData.pct}</span>
        <span className={medium}>{teamData.gb}</span>
        <span className={large}>{teamData.home}</span>
        <span className={large}>{teamData.away}</span>
        <span className={large}>{teamData.streak}</span>
        <span className={medium}>{teamData.last_ten}</span>
      </div>
    )
  }
}
export default function FilterRow({heading}) {
  return (
    <div className={filterRow}>
      <span className={xxLarge}>{heading}</span>
      <span className={xLarge}></span>
      <span className={medium} onClick={(() => console.log('clicked'))}>{'w'}</span>
      <span className={medium} onClick={(() => console.log('clicked'))}>{'l'}</span>
      <span className={medium} onClick={(() => console.log('clicked'))}>{'%'}</span>
      <span className={medium}>{'gb'}</span>
      <span className={large}>{'home'}</span>
      <span className={large}>{'away'}</span>
      <span className={large}>{'strk'}</span>
      <span className={medium}>{'l10'}</span>
    </div>
  )
}
class TeamList extends Component {

  render() {
    let standings = this.props.standings
    var al = standings[1].queryResults.row
    var nl = standings[0].queryResults.row
    var both = al.concat(nl)
    return (
      <div>
        <ul className={filterList}>
          <li><Link to={'/mlb/standings/division'} className={filterItem} activeClassName='active'>{'division'}</Link></li>
          <li><Link to={'/mlb/standings/league'} className={filterItem} activeClassName='active'>{'league'}</Link></li>
          <li><Link to={'/mlb/standings/overall'} className={filterItem} activeClassName='active'>{'overall'}</Link></li>
        </ul>
        {this.props.filter === 'division'
          ? <div className={standingsContainer}>
              <FilterRow heading={'al east'} />
              { al.filter((team) => team.division_id === '201').sort((a,b) => b.pct - a.pct).map((item) => <TeamRow key={item.team_id} team={item} /> )}
              <FilterRow heading={'al central'} />
              { al.filter((team) => team.division_id === '202').sort((a,b) => b.pct - a.pct).map((item) => <TeamRow key={item.team_id} team={item} /> )}
              <FilterRow heading={'al west'} />
              { al.filter((team) => team.division_id === '200').sort((a,b) => b.pct - a.pct).map((item) => <TeamRow key={item.team_id} team={item} /> )}
              <FilterRow heading={'nl east'} />
              { nl.filter((team) => team.division_id === '204').sort((a,b) => b.pct - a.pct).map((item) => <TeamRow key={item.team_id} team={item} /> )}
              <FilterRow heading={'nl central'} />
              { nl.filter((team) => team.division_id === '205').sort((a,b) => b.pct - a.pct).map((item) => <TeamRow key={item.team_id} team={item} /> )}
              <FilterRow heading={'nl west'} />
              { nl.filter((team) => team.division_id === '203').sort((a,b) => b.pct - a.pct).map((item) => <TeamRow key={item.team_id} team={item} /> )}
            </div>
          : this.props.filter === 'league'
            ? <div className={standingsContainer}>
                <FilterRow heading={'al'} />
                { al.sort((a,b) => b.pct - a.pct).map((item) => <TeamRow key={item.team_id} team={item} /> )}
                <FilterRow heading={'nl'} />
                { nl.sort((a,b) => b.pct - a.pct).map((item) => <TeamRow key={item.team_id} team={item} /> )}
              </div>
            : this.props.filter === 'overall'
              ? <div className={standingsContainer}>
                  <FilterRow heading={'overall'} />
                  { both.sort((a,b) => b.pct - a.pct).map((item) => <TeamRow key={item.team_id} team={item} /> )}
                </div>
              : null
        }
      </div>
    )
  }
}

export default function Standings(props) {
  return (
    <div>
      {props.isLoading === true
        ? <Loading speed={400} text={'loading'} />
        : <TeamList standings={props.standings} filter={props.filter} />
      }
    </div>
  )
}

Standings.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}
