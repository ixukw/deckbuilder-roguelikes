//import { useState, useEffect } from 'react';
import { GameProvider } from './game/gameContext';
import { insertCoin, me } from 'playroomkit';
import Game from './game/game';

import './SolitaireApp.css';

// Show popup and ask user permissions for their discord information
/*await insertCoin({
  gameId: "4roZe1ZWjp0zou4VY7Da",
  discord: true
}).catch(e => console.log(e));*/

const SolitaireApp = () => {
  return (
    <div className="solitaireapp-component">
      <div className="info-bar">
        Solitatro
        <span>{me() ? me().getProfile().name : ''}</span>
      </div>
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}
export default SolitaireApp;