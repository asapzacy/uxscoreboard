import React from 'react'
import { formatDetailsDate, runnersOnBase, ballCount, strikeAndOutCount } from 'helpers/utils'
import OpenCircle from 'react-icons/lib/fa/circle-thin'
import FullCircle from 'react-icons/lib/fa/circle'
import { detailsContainer, aboutContainer, linescoreContainer,
  midGameDetails, pitchersTeam, diamond, circles, bso, circle, circleFilled,
 ballsAndStrikes, baseRunners, field, container} from './styles.css'

export default function Details({awayTeam, homeTeam, venue, location, date,
  linescore, status, awayAbbr, homeAbbr, pitcher, batter, pbp, runners, balls, strikes, outs,
  inningState, spAway, spHome, pWin, pLoss, pSave, alerts, review, homeCode, awayCode}) {

  return (
    <div className={detailsContainer}>
      <div className={aboutContainer}>
        <span><strong>{`${awayTeam} v. ${homeTeam}`}</strong></span>
        <span><small>{`${formatDetailsDate(date)} - ${location} - ${venue}`}</small></span>        <br />
      </div>
      <div className={linescoreContainer}>
        <BoxScore
          awayAbbr={awayAbbr}
          homeAbbr={homeAbbr}
          linescore={linescore}
          review={review}
          awayCode={awayCode}
          homeCode={homeCode}
          status={status}
        />
      </div>
      <div className={midGameDetails}>
        {status === 'Warmup' || status === 'Pre-Game' || status === 'Preview' || status === 'Delayed Start' || status === 'Postponed'
          ? <PreGameInfo
              awayAbbr={awayAbbr}
              homeAbbr={homeAbbr}
              spAway={spAway}
              spHome={spHome}
              alerts={alerts}
            />
          : status === 'In Progress' || status === 'Delayed' || status === 'Suspended'
            ? <MidGameInfo
                awayAbbr={awayAbbr}
                homeAbbr={homeAbbr}
                pitcher={pitcher}
                batter={batter}
                pbp={pbp}
                runners={runners}
                balls={balls}
                strikes={strikes}
                outs={outs}
                inningState={inningState}
                alerts={alerts}
              />
            : status === 'Final' || status === 'Game Over' || status === 'Completed Early'
              ? <PostGameInfo
                  pWin={pWin}
                  pLoss={pLoss}
                  pSave={pSave}
                />
              : null
          }
      </div>
    </div>
  )
}

function PostGameInfo({pWin, pLoss, pSave}) {
  return (
    <div>
      <span className={pitchersTeam}><strong>{`Win: `}</strong>{`${pWin.first} ${pWin.last} (${pWin.wins}-${pWin.losses})`}<br /></span>
      {pSave.first ? <span className={pitchersTeam}><strong>{`Save: `}</strong>{`${pSave.first} ${pSave.last} (${pSave.saves})`}<br /></span> : null}
      <span className={pitchersTeam}><strong>{`Loss: `}</strong>{`${pLoss.first} ${pLoss.last} (${pLoss.wins}-${pLoss.losses})`}<br /></span>
    </div>
  )
}



function PreGameInfo({awayAbbr, homeAbbr, spAway, spHome, alerts}) {
  return (
    <div>
      { alerts.text[0]
          ? <div style={{textAlign: 'center',padding: '1em'}}><span>{`${alerts.text}.`}</span></div>
          : null
      }
      { spAway && spHome
          ?   <div><h5>{'Starting Pitchers:'}</h5>
                <span className={pitchersTeam}>{`${awayAbbr}: `}</span>
                <span>{`${spAway.first} ${spAway.last}, ${spAway.throwinghand.toLowerCase()} (${spAway.wins}-${spAway.losses}, ${spAway.era} era)`}</span>
                <br />
                <span className={pitchersTeam}>{`${homeAbbr}: `}</span>
                <span>{`${spHome.first} ${spHome.last}, ${spAway.throwinghand.toLowerCase()} (${spHome.wins}-${spHome.losses}, ${spHome.era} era)`}</span>
                <br /></div>
        : null
      }
    </div>
  )
}


function MidGameInfo({awayAbbr, homeAbbr, pitcher, batter, pbp, runners, balls,
  strikes, outs, inningState, alerts}) {
  return (
    <div>
      <div className={diamond}>
        <div className={field}>
          <img src={`assets/img/mlb/other/diamond-${runnersOnBase(runners)}.svg`} />
        </div>
        <div className={container}>
          <div className={baseRunners}>
            { Object.keys(runners).length > 1
              ? <h5>{'Runners on Base:'}</h5>
              : null
            }
            { runners.runner_on_1b
              ? <span><strong>{`1b: `}</strong>{`${runners.runner_on_1b.first.charAt(0)}. ${runners.runner_on_1b.last}`}</span>
              : null
            }
            { runners.runner_on_2b
              ? <span><strong>{`2b: `}</strong>{`${runners.runner_on_2b.first.charAt(0)}. ${runners.runner_on_2b.last}`}</span>
              : null
            }
            { runners.runner_on_3b
              ? <span><strong>{`3b: `}</strong>{`${runners.runner_on_3b.first.charAt(0)}. ${runners.runner_on_3b.last}`}</span>
              : null
            }
          </div>
          <div className={ballsAndStrikes}>
            <span className={bso}>
              <span className={pitchersTeam}>{`b: `}</span>
              <span dangerouslySetInnerHTML={ballCount(balls, inningState)}></span>
            </span>
            <span className={bso}>
              <span className={pitchersTeam}>{`s: `}</span>
              <span dangerouslySetInnerHTML={strikeAndOutCount(strikes, inningState)}></span>
            </span>
            <span className={bso}>
              <span className={pitchersTeam}>{`o: `}</span>
              <span dangerouslySetInnerHTML={strikeAndOutCount(outs, inningState)}></span>
            </span>
          </div>
        </div>
      </div>
      { alerts.text[0]
          ? <div style={{textAlign: 'center',padding: '1em'}}><span>{`${alerts.text}.`}</span></div>
          : null
      }

      <div>
        <h5>{'Current Matchup:'}</h5>
        <span className={pitchersTeam}>{`P: `}</span>
        <span>{`${pitcher.first.charAt(0)}. ${pitcher.last} (${pitcher.ip}ip, ${pitcher.er}er)`}</span>
        <br />
        <span className={pitchersTeam}>{`H: `}</span>
        <span>{`${batter.first.charAt(0)}. ${batter.last} (${batter.h}-${batter.ab})`}</span>
        <br />
      </div>
      <div>
        <h5>{'Last Play:'}</h5>
        <span>{pbp.last}</span>
      </div>
    </div>

  )
}

function BoxScore({awayAbbr, homeAbbr, linescore, review, homeCode, awayCode, status}) {
  var teamColors = {
    ana: [{ color: '#ba0021', fontWeight: 'bold' }],
    ari: [{ color: '#a71930', fontWeight: 'bold' }],
    atl: [{ color: '#13274f', fontWeight: 'bold' }],
    bal: [{ color: '#df4601', fontWeight: 'bold' }],
    bos: [{ color: '#0d2b56', fontWeight: 'bold' }],
    chc: [{ color: '#0e3386', fontWeight: 'bold' }],
    cin: [{ color: '#c6011f', fontWeight: 'bold' }],
    cle: [{ color: '#e31937', fontWeight: 'bold' }],
    col: [{ color: '#333366', fontWeight: 'bold' }],
    cws: [{ color: '#000000', fontWeight: 'bold' }],
    det: [{ color: '#021540', fontWeight: 'bold' }],
    hou: [{ color: '#002d62', fontWeight: 'bold' }],
    kc:  [{ color: '#c09a5b', fontWeight: 'bold' }],
    la:  [{ color: '#005a9c', fontWeight: 'bold' }],
    mia: [{ color: '#0077c8', fontWeight: 'bold' }],
    mil: [{ color: '#0a2351', fontWeight: 'bold' }],
    min: [{ color: '#d31145', fontWeight: 'bold' }],
    nym: [{ color: '#ff5910', fontWeight: 'bold' }],
    nyy: [{ color: '#142448', fontWeight: 'bold' }],
    oak: [{ color: '#003831', fontWeight: 'bold' }],
    phi: [{ color: '#e81828', fontWeight: 'bold' }],
    pit: [{ color: '#000000', fontWeight: 'bold' }],
    sd:  [{ color: '#002d62', fontWeight: 'bold' }],
    sea: [{ color: '#005c5c', fontWeight: 'bold' }],
    sf:  [{ color: '#fd5a1e', fontWeight: 'bold' }],
    stl: [{ color: '#c41e3a', fontWeight: 'bold' }],
    tb:  [{ color: '#092c5c', fontWeight: 'bold' }],
    tex: [{ color: '#003278', fontWeight: 'bold' }],
    tor: [{ color: '#134a8e', fontWeight: 'bold' }],
    was: [{ color: '#ab0003', fontWeight: 'bold' }]
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>{'1'}</th>
          <th>{'2'}</th>
          <th>{'3'}</th>
          <th>{'4'}</th>
          <th>{'5'}</th>
          <th>{'6'}</th>
          <th>{'7'}</th>
          <th>{'8'}</th>
          <th>{'9'}</th>
          <th>{'r'}</th>
          <th>{'h'}</th>
          <th>{'e'}</th>
          <th>{'c'}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{awayAbbr.toLowerCase()}</th>
          <td>{linescore.inning[0] ? linescore.inning[0].away : ''}</td>
          <td>{linescore.inning[1] ? linescore.inning[1].away : ''}</td>
          <td>{linescore.inning[2] ? linescore.inning[2].away : ''}</td>
          <td>{linescore.inning[3] ? linescore.inning[3].away : ''}</td>
          <td>{linescore.inning[4] ? linescore.inning[4].away : ''}</td>
          <td>{linescore.inning[5] ? linescore.inning[5].away : ''}</td>
          <td>{linescore.inning[6] ? linescore.inning[6].away : ''}</td>
          <td>{linescore.inning[7] ? linescore.inning[7].away : ''}</td>
          <td>{linescore.inning[8] ? linescore.inning[8].away : ''}</td>
          <td>{linescore.r.away}</td>
          <td>{linescore.h.away}</td>
          <td>{linescore.e.away}</td>
          <td>{review.challenges_away_remaining[0] ? review.challenges_away_remaining >= '1' ? '✓' : '✗' : status === 'Final' ? '-' : ''}</td>
        </tr>
        <tr>
          <th>{homeAbbr.toLowerCase()}</th>
          <td>{linescore.inning[0] ? linescore.inning[0].home : ''}</td>
          <td>{linescore.inning[1] ? linescore.inning[1].home : ''}</td>
          <td>{linescore.inning[2] ? linescore.inning[2].home : ''}</td>
          <td>{linescore.inning[3] ? linescore.inning[3].home : ''}</td>
          <td>{linescore.inning[4] ? linescore.inning[4].home : ''}</td>
          <td>{linescore.inning[5] ? linescore.inning[5].home : ''}</td>
          <td>{linescore.inning[6] ? linescore.inning[6].home : ''}</td>
          <td>{linescore.inning[7] ? linescore.inning[7].home : ''}</td>
          <td>{linescore.inning[8] ? linescore.inning[8].away ? linescore.inning[8].home !== undefined ? linescore.inning[8].home : '✗' : '' : null}</td>
          <td>{linescore.r.home}</td>
          <td>{linescore.h.home}</td>
          <td>{linescore.e.home}</td>
          <td>{review.challenges_home_remaining[0] ? review.challenges_home_remaining >= '1' ? '✓' : '✗' : status === 'Final' ? '-' : ''}</td>
        </tr>
      </tbody>
    </table>
  )
}
