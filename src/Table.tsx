import React from 'react';

const TABLE = [
  { id: 'LIV', goalDiff: 49, points: 93 },
  { id: 'MCI', goalDiff: 57, points: 72 },
  { id: 'CHE', goalDiff: 14, points: 60 },
  { id: 'LEI', goalDiff: 29, points: 59 },
  { id: 'MUN', goalDiff: 26, points: 59 },
  { id: 'WOL', goalDiff: 11, points: 55 },
  { id: 'SHU', goalDiff: 5, points: 54 },
  { id: 'TOT', goalDiff: 9, points: 52 },
]

const pointsForScore = (teamScore, opponentScore) => {
  if (opponentScore > teamScore) return 0;
  if (opponentScore === teamScore) return 1;
  return 3;
}

const calcTable = (initialTable, results) => {
  let table = [...initialTable];

  results.forEach((fixture) => {
    const home = table.find((team) => team.id === fixture.h)
    const away = table.find((team) => team.id === fixture.a)
    const rest = table.filter((team) => ![fixture.h, fixture.a].includes(team.id))


    table = [...rest]
    if (home) table.push({
      ...home,
      goalDiff: home.goalDiff + fixture.hScore - fixture.aScore,
      points: home.points + pointsForScore(fixture.hScore, fixture.aScore)
    })
    if (away) table.push({
      ...away,
      goalDiff: away.goalDiff + fixture.aScore - fixture.hScore,
      points: away.points + pointsForScore(fixture.aScore, fixture.hScore)
    })
  })

  console.log(table)
  return table;
};


const Table = ({ fixtureState }) => {
  const tableState = calcTable(TABLE, fixtureState)

  const sortedTable = tableState.sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff);

  return (
    <div className="table">
      <pre>{JSON.stringify(sortedTable, null, 2)}</pre>
    </div>
  )
}
export default Table;