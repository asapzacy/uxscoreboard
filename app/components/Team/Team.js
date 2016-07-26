import React from 'react'
import { teamContainer, teamLogo, teamInfo, teamName,
  teamRecord, teamScore, nyy, chc } from './styles.css'

export default function Team({name, code, ls, ws, runs}) {

  var teamColors = {
    // top === secondary style || bottom === primary style
    ana: [{ backgroundImage: '-webkit-linear-gradient(0deg, #003263 40%, transparent 0%)',
            backgroundImage: '-webkit-linear-gradient(0deg, #ba0021 40%, transparent 0%)' }],
    ari: { backgroundImage: '-webkit-linear-gradient(0deg, #a71930 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #000000 40%, transparent 0%)' },
    atl: { backgroundImage: '-webkit-linear-gradient(0deg, #ffffff 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #13274F 40%, transparent 0%)' },
    bal: { backgroundImage: '-webkit-linear-gradient(0deg, #ffffff 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #000000 40%, transparent 0%)' },
    bos: { backgroundImage: '-webkit-linear-gradient(0deg, #0d2b56 40%, transparent 0%)' },
//  chc: { backgroundImage: '-webkit-linear-gradient(0deg, #0e3386 40%, transparent 0%)' },
    cin: { backgroundImage: '-webkit-linear-gradient(0deg, #cccccc 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #c6011f 40%, transparent 0%)' },
    cle: { backgroundImage: '-webkit-linear-gradient(0deg, #002b5c 40%, transparent 0%)' },
    col: { backgroundImage: '-webkit-linear-gradient(0deg, #ffffff 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #c4ced4 40%, transparent 0%)' },
    cws: { backgroundImage: '-webkit-linear-gradient(0deg, #000000 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #c4ced4 40%, transparent 0%)' },
    det: { backgroundImage: '-webkit-linear-gradient(0deg, #0c2c56 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #ffffff 40%, transparent 0%)' },
    hou: { backgroundImage: '-webkit-linear-gradient(0deg, #eb6e1f 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #002d62 40%, transparent 0%)' },
    kc:  { backgroundImage: '-webkit-linear-gradient(0deg, #004687 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #ffffff 40%, transparent 0%)' },
    la:  { backgroundImage: '-webkit-linear-gradient(0deg, #005a9c 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #ffffff 40%, transparent 0%)' },
    mia: { backgroundImage: '-webkit-linear-gradient(0deg, #ffffff 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #0077c8 40%, transparent 0%)' },
    mil: { backgroundImage: '-webkit-linear-gradient(0deg, #ffffff 40%, transparent 0%)' },
    min: { backgroundImage: '-webkit-linear-gradient(0deg, #002b5c 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #d31145 40%, transparent 0%)' },
    nym: { backgroundImage: '-webkit-linear-gradient(0deg, #002d72 40%, transparent 0%)' },
//  nyy: { backgroundImage: '-webkit-linear-gradient(0deg, #142448 40%, transparent 0%)' },
    oak: { backgroundImage: '-webkit-linear-gradient(0deg, #003831 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #ffffff 40%, transparent 0%)' },
    phi: { backgroundImage: '-webkit-linear-gradient(0deg, #e81828 40%, transparent 0%)' },
    pit: { backgroundImage: '-webkit-linear-gradient(0deg, #000000 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #fdb827 40%, transparent 0%)' },
    sd:  { backgroundImage: '-webkit-linear-gradient(0deg, #7f411c 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #002d62 40%, transparent 0%)' },
    sea: { backgroundImage: '-webkit-linear-gradient(0deg, #0c2c56 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #005c5c 40%, transparent 0%)' },
    sf:  { backgroundImage: '-webkit-linear-gradient(0deg, #000000 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #eee3c7 40%, transparent 0%)' },
    stl: { backgroundImage: '-webkit-linear-gradient(0deg, #c41e3a 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #eee3c7 40%, transparent 0%)' },
    tb:  { backgroundImage: '-webkit-linear-gradient(0deg, #092c5c 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #8fbce6 40%, transparent 0%)' },
    tex: { backgroundImage: '-webkit-linear-gradient(0deg, #003278 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #c0111f 40%, transparent 0%)' },
    tor: { backgroundImage: '-webkit-linear-gradient(0deg, #e8291c 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #134a8e 40%, transparent 0%)' },
    was: { backgroundImage: '-webkit-linear-gradient(0deg, #ffffff 40%, transparent 0%)',
           backgroundImage: '-webkit-linear-gradient(0deg, #ab0003 40%, transparent 0%)' }
  }

    return (
    // <div className={code === 'nyy' ? nyy : code === 'chc' ? chc : teamContainer} style={teamColors[`${code}`]}>
    <div className={code === 'nyy' ? nyy : code === 'chc' ? chc : teamContainer} style={teamColors['ana'][0]}>
      <img className={teamLogo} src={`assets/img/mlb/teams/${code}.svg`} alt={name} />
      <div className={teamInfo}>
        <span className={teamName}>{name.length > 7 ? <small>{name}</small> : name}</span>
        <span className={teamRecord}><strong>{`(${ws}-${ls})`}</strong></span>
      </div>
      { runs ? <span className={teamScore}>{runs}</span> : null }
    </div>
  )
}
