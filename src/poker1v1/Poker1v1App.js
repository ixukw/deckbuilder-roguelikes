import './App.css';
import { Client } from 'boardgame.io/react';
import { pokergame } from './game';
import { Pokerboard } from './board';
import { SocketIO } from 'boardgame.io/multiplayer'
import React, {useState} from 'react';
//import { Lobby } from 'boardgame.io/react';
//import { Local } from 'boardgame.io/multiplayer';

const AppClient = Client({
  game: pokergame,
  board: Pokerboard,
  //multiplayer: Local(),
  multiplayer: SocketIO({
    server: 'https://poker-roguelike.onrender.com'
    //server: 'poker-roguelike-12345678901234.adaptable.app',
    //server: `http://192.168.0.48:8000`,
    /*socketOpts:{
      cors: {
        origin: "http://localhost:8000",
        credentials: true,
        allowedHeaders: ['Access-Control-Allow-Origin'],
      },

      withCredentials: true,
    }*/
    }),
});

const Poker1v1App = () => {
  const [playerid, setPlayerid] = useState(null);

  return (
    <div className="poker1v1app-component">
      {!playerid ?
        <div>
          <button onClick={() => setPlayerid('0')}>Player 0</button>
          <button onClick={() => setPlayerid('1')}>Player 1</button>
        </div>
        :
        <AppClient playerID={playerid}/>
      }
    </div>
  );
}
export default Poker1v1App;