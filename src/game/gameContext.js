import { createContext, useContext, useReducer } from 'react';
import { INIT_STATE, GAME_CONFIG } from './util';
import { GameCard, GameCardStack } from './';

export const GameContext = createContext();
export const GameDispatchContext = createContext();

export function useGameContext() {
  return useContext(GameContext);
}

export function useGameDispatch() {
  return useContext(GameDispatchContext);
}

export function GameProvider({ children }) {
  const [game, dispatch] = useReducer(gameReducer, INIT_STATE);
  
  // create deck
  for (const r in game.ranks) {
    for (const s of game.suits) {
      game.deck.push(new GameCard(r, s));
    }
  }

  // fill init stacks
  /*
  let d2 = init.deck.slice()
  const initialRows = 3;//Math.ceil(deck.length/cols.length);
  for (let i=0; i<cols.length; i++) {
    for (let j=0; j<initialRows; j++) {
      if (d2.length > 0) {
        const cardInd = Math.floor(Math.random()*(d2.length))
        cols[i].push(d2[cardInd]);
        d2.splice(cardInd, 1);
      }
    }
  }*/

  // create slots
  for (let i=0; i<GAME_CONFIG.initial_slots; i++) {
    game.stacks.push(new GameCardStack());
    game.nextStacks.push(new GameCardStack());
  }


  console.log(game);
  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

const gameReducer = (state, action) => {
  switch (action.type) {
    
    default:
      throw new Error('Unknown game action');
  }
};