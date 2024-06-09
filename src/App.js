//import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SolitaireApp, Poker1v1App, MahjongApp } from './pages';
import { me } from 'playroomkit';

import './App.css';

const App = () => {
  const [activeGame, setActiveGame] = useState();
  const gameMappings = {
    'solitaire': { name: 'Solitatro', component: <SolitaireApp />},
    'poker1v1': { name: 'Poker 1v1', component: <Poker1v1App />},
    'mahjong': { name: 'Mahjong WIP', component: <MahjongApp />},
  }

  return (
    <div className="approot-component">
      <div className="info-bar">
        {activeGame ? gameMappings[activeGame].name : <strong>Deckbuilder Roguelikes</strong>}
        <span>{me() ? me().getProfile().name : ''}</span>
      </div>
      {activeGame ?
        gameMappings[activeGame].component
      :
      <div className="links">
        {Object.entries(gameMappings).map(([k,g]) => 
          <span className="link" onClick={() => setActiveGame(k)}>{g.name}</span>
        )}
      </div>
      }
      {/*<div className="links">
        <Link to="/poker1v1/">Poker 1v1</Link>
        <Link to="/solitaire/">Solitaire</Link>
        <Link to="/mahjong/">Mahjong</Link>
    </div>*/}
    </div>
  )
}
export default App;