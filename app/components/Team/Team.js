import React from 'react'
import { teamContainer, teamLogo, teamInfo, teamName,
  teamRecord, teamScore } from './styles.css'

export default function Team({name, code, ls, ws, runs}) {
  var teamColors = {
    ana: { backgroundColor: '#ba0021', color: '#003263' },
    ari: { backgroundColor: '#a71930', color: '#000000' },
    atl: { backgroundColor: '#ce1141', color: '#13274f' },
    bal: { backgroundColor: '#f5f5f5', color: '#000000' },
    bos: { backgroundColor: '#bd3039', color: '#0d2b56' },
    chc: { backgroundColor: '#cc3433', color: '#0e3386' },
    cin: { backgroundColor: '#c6011f', color: '#000000' },
    cle: { backgroundColor: '#002b5c', color: '#e31937' },
    col: { backgroundColor: '#333366', color: '#231f20' },
    cws: { backgroundColor: '#000000', color: '#c4ced4' },
    det: { backgroundColor: '#0c2c56', color: '#ffffff' },
    hou: { backgroundColor: '#002d62', color: '#eb6e1f' },
    kc:  { backgroundColor: '#004687', color: '#c09a5b' },
    la:  { backgroundColor: '#ef3e42', color: '#00519c' },
    mia: { backgroundColor: '#ff6600', color: '#0077c8' },
    mil: { backgroundColor: '#0a2351', color: '#b6922e' },
    min: { backgroundColor: '#002b5c', color: '#d31145' },
    nym: { backgroundColor: '#ff5910', color: '#002d72' },
    nyy: { backgroundColor: '#f5f5f5', color: '#003087', backgroundSize: 15,
          backgroundImage: '-webkit-linear-gradient(0, #f5f5f5 92%, #003087 8%)' },
    oak: { backgroundColor: '#003831', color: '#efb21e' },
    phi: { backgroundColor: '#284898', color: '#e81828' },
    pit: { backgroundColor: '#fdb827', color: '#000000' },
    sd:  { backgroundColor: '#002d62', color: '#fec325' },
    sea: { backgroundColor: '#0c2c56', color: '#005c5c' },
    sf:  { backgroundColor: '#fd5a1e', color: '#000000' },
    stl: { backgroundColor: '#c41e3a', color: '#000066' },
    tb:  { backgroundColor: '#092c5c', color: '#8fbce6' },
    tex: { backgroundColor: '#c0111f', color: '#003278' },
    tor: { backgroundColor: '#134a8e', color: '#1d2d5c' },
    was: { backgroundColor: '#ab0003', color: '#11225b' }
  }
    return (
    <div className={teamContainer} style={teamColors[`${code}`]}>
      <img className={teamLogo} src={`assets/img/mlb/teams/${code}.svg`} alt={name} />
      <div className={teamInfo}>
        <span className={teamName}>{name.length > 18 ? <small>{name}</small> : name}</span>
        <span className={teamRecord}><strong>{`(${ws}-${ls})`}</strong></span>
      </div>
      { runs ? <span className={teamScore}>{runs}</span> : null }
    </div>
  )
}
