//import { useState, useEffect } from 'react';
import { GameProvider } from './game/gameContext';
import { me } from 'playroomkit';
import Game from './game/game';

import './App.css';

const App = () => {

  return (
    <div className="app-component">
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
export default App;