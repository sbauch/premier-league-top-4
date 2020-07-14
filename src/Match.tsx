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
      <h1>{h}</h1>
      <input min="0" type='number' onChange={(e) => handleScore('hScore', e.target)} value={scoreState.hScore} />
      <h1>vs</h1>
      <input min="0" type='number' onChange={(e) => handleScore('aScore', e.target)} value={scoreState.aScore} />
      <h1>{a}</h1>
    </div>
  )
}
export default Match;