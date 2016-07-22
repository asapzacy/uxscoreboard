import React from 'react'
import { formatDetailsDate, runnersOnBase, ballCount, strikeAndOutCount } from 'helpers/utils'
import OpenCircle from 'react-icons/lib/fa/circle-thin'
import FullCircle from 'react-icons/lib/fa/circle'
import { detailsContainer, aboutContainer, linescoreContainer,
  midGameDetails, pitchersTeam, diamond, circles, bso, circle, circleFilled,
 ballsAndStrikes, baseRunners, field, container} from './styles.css'

export default function Details({awayTeam, homeTeam, venue, location, date,
  linescore, status, awayAbbr, homeAbbr, pitcher, batter, pbp, runners, balls, strikes, outs,
 inningState, spAway, spHome, pWin, pLoss, pSave}) {
  return (
    <div className={detailsContainer}>
      <div className={aboutContainer}>
        <span><strong>{`${awayTeam} v. ${homeTeam}`}</strong></span>
        <span><small>{`${formatDetailsDate(date)} - ${location} - ${venue}`}</small></span>
      </div>
      <div className={linescoreContainer}>
        <BoxScore linescore={linescore} awayAbbr={awayAbbr} homeAbbr={homeAbbr} />
      </div>
      <div className={midGameDetails}>
        {status === 'Warmup' || status === 'Pre-Game' || status === 'Preview' || status === 'Delayed Start' || status === 'Postponed'
          ? <PreGameInfo
              awayAbbr={awayAbbr}
              homeAbbr={homeAbbr}
              spAway={spAway}
              spHome={spHome}
            />
          : status === 'In Progress' || status === 'Delayed'
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
      <h5>{'Pitching Results:'}</h5>
      <span className={pitchersTeam}><strong>{`Win: `}</strong>{`${pWin.first} ${pWin.last} (${pWin.wins}-${pWin.losses})`}</span>
      <br />
      <span className={pitchersTeam}><strong>{`Loss: `}</strong>{`${pLoss.first} ${pLoss.last} (${pLoss.wins}-${pLoss.losses})`}</span>
      <br />
      {pSave.first ? <span className={pitchersTeam}><strong>{`Save: `}</strong>{`${pSave.first} ${pSave.last} (${pSave.saves})`}</span> : null}
    </div>
  )
}



function PreGameInfo({awayAbbr, homeAbbr, spAway, spHome}) {
  return (
    <div>
      <div>
        <h5>{'Starting Pitchers:'}</h5>
        <span className={pitchersTeam}>{`${awayAbbr}: `}</span>
        <span>{`${spAway.first} ${spAway.last}, ${spAway.throwinghand.toLowerCase()} (${spAway.wins}-${spAway.losses}, ${spAway.era} era)`}</span>
        <br />
        <span className={pitchersTeam}>{`${homeAbbr}: `}</span>
        <span>{`${spHome.first} ${spHome.last}, ${spAway.throwinghand.toLowerCase()} (${spHome.wins}-${spHome.losses}, ${spHome.era} era)`}</span>
        <br />
      </div>
    </div>
  )
}


function MidGameInfo({awayAbbr, homeAbbr, pitcher, batter, pbp, runners, balls,
  strikes, outs, inningState}) {
  return (
    <div>
      <div className={diamond}>
        <div className={field}>
          <img src={`assets/img/mlb/other/diamond-${runnersOnBase(runners)}.svg`} />
        </div>
        <div className={container}>
          <div className={baseRunners}>
            { Object.keys(runners).length > 1
              ? <h5>{'Base Runners:'}</h5>
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
        <br />
        <h5>{'Last Play:'}</h5>
        <span>{pbp.last}</span>
      </div>
    </div>

  )
}

function Pitchers({awayAbbr, awayFirst, awayLast, awayLs, awayWs, awayEra,
  homeAbbr, homeFirst, homeLast, homeLs, homeWs, homeEra}) {
  return (
    <div>
      <h5>{'Starting Pitchers'}</h5>
      <div>
        <span className={pitchersTeam}>{`${awayAbbr}: `}</span>
        <span>{`${awayFirst.charAt(0)} ${awayLast} (${awayLs}-${awayWs}, ${awayEra})`}</span>
      </div>
      <div>
        <span className={pitchersTeam}>{`${homeAbbr}: `}</span>
        <span>{`${homeFirst.charAt(0)} ${homeLast} (${homeLs}-${homeWs}, ${homeEra})`}</span>
      </div>
    </div>
  )
}

function BoxScore({linescore, awayAbbr, homeAbbr}) {
  console.log(linescore)
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
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{awayAbbr}</th>
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
        </tr>
        <tr>
          <th>{homeAbbr}</th>
          <td>{linescore.inning[0] ? linescore.inning[0].home : ''}</td>
          <td>{linescore.inning[1] ? linescore.inning[1].home : ''}</td>
          <td>{linescore.inning[2] ? linescore.inning[2].home : ''}</td>
          <td>{linescore.inning[3] ? linescore.inning[3].home : ''}</td>
          <td>{linescore.inning[4] ? linescore.inning[4].home : ''}</td>
          <td>{linescore.inning[5] ? linescore.inning[5].home : ''}</td>
          <td>{linescore.inning[6] ? linescore.inning[6].home : ''}</td>
          <td>{linescore.inning[7] ? linescore.inning[7].home : ''}</td>
          <td>{linescore.inning[8] ? typeof linescore.inning[8].home !== null && typeof linescore.inning[8].home !== 'undefined' ? linescore.inning[8].home : 'x' : ''}</td>
          <td>{linescore.r.home}</td>
          <td>{linescore.h.home}</td>
          <td>{linescore.e.home}</td>
        </tr>
      </tbody>
    </table>
  )
}
