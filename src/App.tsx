import React, { useReducer } from 'react';
import './App.css';
import Match from './Match';
import Table from './Table';

const FIXTURES = {
  36: [
    { id: 'CHENOR', h: 'CHE', a: 'NOR', hScore: 0, aScore: 0 },
    { id: 'BURWOL', h: 'BUR', a: 'WOL', hScore: 0, aScore: 0 },
    { id: 'NEWTOT', h: 'NEW', a: 'TOT', hScore: 0, aScore: 0 },
    { id: 'LEISHU', h: 'LEI', a: 'SHU', hScore: 0, aScore: 0 },
    { id: 'CRYMUN', h: 'CRY', a: 'MUN', hScore: 0, aScore: 0 },
  ],
  37: [
    { id: 'TOTLEI', h: 'TOT', a: 'LEI', hScore: 0, aScore: 0 },
    { id: 'SHUEVE', h: 'SHU', a: 'EVE', hScore: 0, aScore: 0 },
    { id: 'WOLCRY', h: 'WOL', a: 'CRY', hScore: 0, aScore: 0 },
    { id: 'MUNWHU', h: 'MUN', a: 'WHU', hScore: 0, aScore: 0 },
    { id: 'LIVCHE', h: 'LIV', a: 'CHE', hScore: 0, aScore: 0 },
  ],
  38: [
    { id: 'CHEWOL', h: 'CHE', a: 'WOL', hScore: 0, aScore: 0 },
    { id: 'CRYTOT', h: 'CRY', a: 'TOT', hScore: 0, aScore: 0 },
    { id: 'LEIMUN', h: 'LEI', a: 'MUN', hScore: 0, aScore: 0 },
    { id: 'SOUSHU', h: 'SOU', a: 'SHU', hScore: 0, aScore: 0 },
  ]
}

const updateFixtures = (state, { id, ...result }) => {
  const fixtures = state.filter((fixture) => fixture.id !== id)
  return [
    ...fixtures,
    { id, ...result }
  ]
}

function App() {
  const [fixtureState, disptachFixture] = useReducer(
    updateFixtures,
    Object.values(FIXTURES).flat()
  );

  return (
    <div className="main">
      <div className="fixtures">
        {Object.entries(FIXTURES).map(([matchweek, fixtures]) => (
          <div key={matchweek}>
            <h3>Matchweek {matchweek}</h3>
            <div>
              {fixtures.map((f) => (
                <Match key={f.id} dispatch={disptachFixture} match={f} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="table">
        <Table fixtureState={fixtureState} />
      </div>
    </div>
  );
}

export default App;
