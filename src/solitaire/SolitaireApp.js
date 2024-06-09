//import { useState, useEffect } from 'react';
import { GameProvider } from './game/gameContext';
import Game from './game/game';

import './SolitaireApp.css';

const SolitaireApp = () => {
  return (
    <div className="solitaireapp-component">
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}
export default SolitaireApp;