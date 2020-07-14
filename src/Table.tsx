import React from 'react';
import FlipMove from 'react-flip-move';
import './App.css';

const TABLE = [
  { id: 'LIV', goalDiff: 49, points: 93 },
  { id: 'MCI', goalDiff: 57, points: 72 },
  { id: 'CHE', goalDiff: 14, points: 60 },
  { id: 'LEI', goalDiff: 29, points: 59 },
  { id: 'MUN', goalDiff: 26, points: 59 },
  { id: 'WOL', goalDiff: 11, points: 55 },
  { id: 'SHU', goalDiff: 5, points: 54 },
  { id: 'TOT', goalDiff: 9, points: 52 },
  { id: 'ARS', goalDiff: 7, points: 50 },
  { id: 'BUR', goalDiff: -8, points: 50 },
  { id: 'EVE', goalDiff: -11, points: 45 },
  { id: 'SOU', goalDiff: -13, points: 45 },
  { id: 'NEW', goalDiff: -16, points: 43 },
  { id: 'CRY', goalDiff: -15, points: 42 },
  { id: 'BHA', goalDiff: -16, points: 36 },
  { id: 'WHU', goalDiff: -15, points: 34 },
  { id: 'WAT', goalDiff: -21, points: 34 },
  { id: 'BOU', goalDiff: -24, points: 31 },
  { id: 'AVL', goalDiff: -27, points: 30 },
  { id: 'NOR', goalDiff: -41, points: 21 },
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

  return table;
};


const Table = ({ fixtureState }) => {
  const tableState = calcTable(TABLE, fixtureState)

  const sortedTable = tableState.sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff);

  return (
    <table className="table">
      <thead>
        <tr>
          <td></td>
          <td align="right">GD</td>
          <td align="right">PTS</td>
        </tr>
      </thead>
      <tbody>
        <FlipMove>
          {sortedTable.map((club, index) => (
            <tr key={club.id}>
              <td>{index + 1}.&nbsp;{club.id}</td>

              <td align="right">{club.goalDiff}</td>
              <td align="right" >{club.points}</td>
            </tr>
          ))}
        </FlipMove>
      </tbody>
    </table>

  )
}
export default Table;