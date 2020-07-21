import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import Match from './Match';
import Table from './Table';
import withQueryParams from 'react-router-query-params';

const FIXTURES = {
  36: [
    { id: 'CHENOR', h: 'CHE', a: 'NOR', hScore: 1, aScore: 0 },
    { id: 'BURWOL', h: 'BUR', a: 'WOL', hScore: 1, aScore: 1 },
    { id: 'MCIBOU', h: 'MCI', a: 'BOU', hScore: 2, aScore: 1 },
    { id: 'NEWTOT', h: 'NEW', a: 'TOT', hScore: 1, aScore: 3 },
    { id: 'ARSLIV', h: 'ARS', a: 'LIV', hScore: 2, aScore: 1 },
    { id: 'EVEAVL', h: 'EVE', a: 'AVL', hScore: 0, aScore: 1 },
    { id: 'LEISHU', h: 'LEI', a: 'SHU', hScore: 2, aScore: 0 },
    { id: 'CRYMUN', h: 'CRY', a: 'MUN', hScore: 0, aScore: 2 },
    { id: 'SOUBHA', h: 'SOU', a: 'BHA', hScore: 1, aScore: 1 },
    { id: 'WHUWAT', h: 'WHU', a: 'WAT', hScore: 3, aScore: 1 },

  ],
  37: [
    { id: 'NORBUR', h: 'NOR', a: 'BUR', hScore: 0, aScore: 2 },
    { id: 'BOUSOU', h: 'BOU', a: 'SOU', hScore: 0, aScore: 2 },
    { id: 'TOTLEI', h: 'TOT', a: 'LEI', hScore: 3, aScore: 0 },
    { id: 'BHANEW', h: 'BHA', a: 'NEW', hScore: 0, aScore: 0 },
    { id: 'SHUEVE', h: 'SHU', a: 'EVE', hScore: 0, aScore: 1 },
    { id: 'WOLCRY', h: 'WOL', a: 'CRY', hScore: 2, aScore: 0 },
    { id: 'WATMCI', h: 'WAT', a: 'MCI', hScore: 0, aScore: 4 },
    { id: 'AVLARS', h: 'AVL', a: 'ARS', hScore: 1, aScore: 0 },
    { id: 'MUNWHU', h: 'MUN', a: 'WHU', hScore: 0, aScore: 0 },
    { id: 'LIVCHE', h: 'LIV', a: 'CHE', hScore: 0, aScore: 0 },
  ],
  38: [
    { id: 'ARSWAT', h: 'ARS', a: 'WAT', hScore: 0, aScore: 0 },
    { id: 'BURBHA', h: 'BUR', a: 'BHA', hScore: 0, aScore: 0 },
    { id: 'CHEWOL', h: 'CHE', a: 'WOL', hScore: 0, aScore: 0 },
    { id: 'CRYTOT', h: 'CRY', a: 'TOT', hScore: 0, aScore: 0 },
    { id: 'EVEBOU', h: 'EVE', a: 'BOU', hScore: 0, aScore: 0 },
    { id: 'LEIMUN', h: 'LEI', a: 'MUN', hScore: 0, aScore: 0 },
    { id: 'MCINOR', h: 'MCI', a: 'NOR', hScore: 0, aScore: 0 },
    { id: 'NEWLIV', h: 'NEW', a: 'LIV', hScore: 0, aScore: 0 },
    { id: 'SOUSHU', h: 'SOU', a: 'SHU', hScore: 0, aScore: 0 },
    { id: 'WHUAVL', h: 'WHU', a: 'AVL', hScore: 0, aScore: 0 },
  ]
}

const updateFixtures = (state, { id, ...result }) => {
  const fixtures = state.filter((fixture) => fixture.id !== id)
  return [
    ...fixtures,
    { id, ...result }
  ]
}

function App({ queryParams, setQueryParams }) {
  const [bootstrapped, setBootstrapped] = useState(false);
  const [fixtureState, dispatchFixture] = useReducer(
    updateFixtures,
    Object.values(FIXTURES).flat(),
  );

  useEffect(() => {
    if (queryParams.s) {
      JSON.parse(atob(queryParams.s)).forEach(f => {
        dispatchFixture(f);
      })

      return
    }
  }, [queryParams.s])

  useEffect(() => {
    if (JSON.stringify(fixtureState) === JSON.stringify(Object.values(FIXTURES).flat())) {
      setBootstrapped(true)
      return;
    }

    const stateParam = btoa(JSON.stringify(fixtureState))

    setQueryParams({ s: stateParam })
    setBootstrapped(true)
  }, [fixtureState, setQueryParams])

  if (!bootstrapped) return null;

  return (
    <>
      <div className="main">
        <div className="fixtures">
          {Object.entries(FIXTURES).map(([matchweek, fixtures]) => (
            <div key={matchweek}>
              <h3>Matchweek {matchweek}</h3>
              <div>
                {fixtures.map((f) => (
                  <Match key={f.id} dispatch={dispatchFixture} match={{ ...f, ...fixtureState.find((fixture) => f.id === fixture.id) }} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="table-container">
          <Table fixtureState={fixtureState} />
        </div>
      </div>
      <a href="/">Reset</a>
    </>
  );
}


const ConnectedApp = withQueryParams({
  stripUnknownKeys: true,
  keys: {
    s: {
      default: '',
      validate: value => true,
    },
  }
})(App);

export default ConnectedApp;
