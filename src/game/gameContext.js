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

  console.log('game state:',game);
  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

/**
 * @param {Object} state game state
 * 
 * @param {Object} action reducer action
 * @property {String} type action type
 * @property {Object} data action data package -- see property of case for detail
 */
const gameReducer = (state, action) => {
  const data = action.data;
  switch (action.type) {
    case 'init_game': {
      return initGame();
    }

    /**
     * @param {GameCard} card card to add
     * @param {Number} index index of stack to add to
     */
    case 'add_card_to_stack': {
      return {...state,
        stacks: state.stacks.map(s => s.id === data.stack.id ? s.addCard(data.card) : s)
      }
    }

    case 'draw_card': {
      return {...state};
    }

    case 'draw_nextStacks': {
      return {...state,
        nextStacks: state.nextStacks.map(s => s)
      };
    }

    /**
     * @param {GameCardStack} stack new selected stack
     */
    case 'update_selected': {
      return {...state, selected: data.stack.copy()};
    }

    case 'add_stack_to_stack': {
      return {...state,
        stacks: state.stacks.map(s => s.id === data.stack.id ? s.addSubStack(data.addStack) : s),
        nextStacks: state.nextStacks.map(s => s.id === data.stack.id ? s.addSubStack(data.addStack) : s),
        submitStacks: state.submitStacks.map(s => s.id === data.stack.id ? s.addSubStack(data.addStack) : s)
      }
    }

    case 'remove_stack_from_stack': {
      return {...state,
        stacks: state.stacks.map(s => s.id === data.stack.id ? s.removeSubStack(data.removeStack) : s),
        nextStacks: state.nextStacks.map(s => s.id === data.stack.id ? s.removeSubStack(data.removeStack) : s),
        submitStacks: state.submitStacks.map(s => s.id === data.stack.id ? s.removeSubStack(data.removeStack) : s)
      }
    }

    default:
      throw new Error('Unknown game action');
  }
};

function initGame() {
  const game = INIT_STATE;

  // create deck
  for (const r in game.ranks) {
    for (const s of game.suits) {
      game.deck.push(new GameCard(r, s));
    }
  }
  game.currentDeck = game.deck.map(card => card.copy());

  // create slots
  for (let i=0; i<GAME_CONFIG.initial_slots; i++) {
    game.stacks.push(new GameCardStack());
    game.nextStacks.push(new GameCardStack());
  }

  // fill slots
  for (let i=0; i<game.stacks.length; i++) {
    for (let j=0; j<5; j++) {
      const index = Math.floor(Math.random()*game.currentDeck.length);
      game.stacks[i].cards.push(game.currentDeck[index]);
      game.currentDeck.splice(index,1);
    }
  }

  return {...game};
}