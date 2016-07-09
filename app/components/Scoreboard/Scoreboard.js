import React, { PropTypes } from 'react'
import { getMlbScores } from 'helpers/api'
import { Game } from 'components'
import { scoreboardContainer, title, slogan } from './styles.css'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '96%',
    margin: '3.2em auto'
  },
  header: {
    fontSize: '6em',
    color: '#333',
    fontWeight: 300,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 30
  },
  subheader: {
    fontSize: '3em',
    color: '#333',
    fontWeight: 100
  }
}

export default function ScoreboardUI({date, scores, handleClick}) {

  return (
    <div className={scoreboardContainer}>
      <h1 style={styles.header}>{date}</h1>
      <p style={styles.subheader}>{'hi'}</p>
      <div style={styles.container}>
      {(scores.game).map((item) => (
        <Game key={item.id} game={item} />
      ))}

      </div>
    </div>
  )
}

export default function Scoreboard(props) {
  return (
    <div>
      {
        props.isLoading === false
        ? <h1 style={styles.header}>{'Loading...'}</h1>
          : <ScoreboardUI
              date={props.date}
              handleClick={props.handleClick}
              scores={props.scores}
            />
      }
    </div>
  )
}

Scoreboard.propTypes = {
  date: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}
