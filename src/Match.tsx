import React, { useEffect, useState } from 'react';

const Match = ({ dispatch, match: { id, h, a, aScore, hScore } }) => {
  const [scoreState, setScoreState] = useState({
    hScore,
    aScore,
  })

  const handleScore = (field, { value }) => {
    setScoreState({
      ...scoreState,
      [field]: parseInt(value, 10),
    })
  }

  useEffect(() => {
    dispatch({ id, h, a, ...scoreState })
  }, [a, dispatch, h, id, scoreState])

  return (
    <div className="match">
      <span>{h}</span>
      <input min="0" type='number' onChange={(e) => handleScore('hScore', e.target)} value={scoreState.hScore} />
      <input min="0" type='number' onChange={(e) => handleScore('aScore', e.target)} value={scoreState.aScore} />
      <span>{a}</span>
    </div>
  )
}
export default Match;