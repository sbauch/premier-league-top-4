import React, { useEffect, useState } from 'react';
import styles from './match.module.css';

const Match = ({ dispatch, match: { id, h, a, aScore, hScore } }) => {
  const [scoreState, setScoreState] = useState({
    hScore,
    aScore,
  })

  const increment = (field) => {
    setScoreState(scoreState => (
      {
        ...scoreState,
        [field]: scoreState[field] + 1
      }
    ))
  }

  const decrement = (field) => {

    setScoreState(scoreState => (
      {
        ...scoreState,
        [field]: scoreState[field] === 0 ? 0 : scoreState[field] - 1
      }
    ))
  }

  useEffect(() => {
    dispatch({ id, h, a, ...scoreState })
  }, [a, dispatch, h, id, scoreState])

  return (
    <div className={styles.match}>
      <div className={styles.teamContainer}>
        <span>{h}</span>
        <img src={require(`./resources/${h}.png`)} alt="team-crest" />
      </div>
      <div className={styles.scores}>
        <div>
          <div onClick={() => { increment('hScore') }} className={styles.arrowUp}></div>
          <div onClick={() => { decrement('hScore') }} className={styles.arrowDown}></div>
        </div>
        <h1>
          {scoreState.hScore}
          &nbsp;&ndash;&nbsp;
          {scoreState.aScore}
        </h1>
        <div>
          <div onClick={() => { increment('aScore') }} className={styles.arrowUp}></div>
          <div onClick={() => { decrement('aScore') }} className={styles.arrowDown}></div>
        </div>
      </div>
      <div className={styles.teamContainer}>
        <img src={require(`./resources/${a}.png`)} alt="team-crest" />
        <span>{a}</span>
      </div>
      {/* <span>{h}</span>
      <input min="0" type='number' onChange={(e) => handleScore('hScore', e.target)} value={scoreState.hScore} />
      <input min="0" type='number' onChange={(e) => handleScore('aScore', e.target)} value={scoreState.aScore} />
      <span>{a}</span> */}
    </div>
  )
}
export default Match;