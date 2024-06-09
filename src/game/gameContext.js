import { createContext, useContext, useReducer } from 'react';
import { INIT_STATE, GAME_CONFIG } from './util';
import { GameCardStack } from './';

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
 * @param {Object} state game state -- see INIT_STATE for detail
 * @param {action} action reducer action
 * 
 * @typedef {Object} action
 * @property {String} type action type
 * @property {action.data} data action data
 * 
 * @typedef {Object} action.data
 * @property {GameCard} card
 * @property {GameCardStack} stack
 * @property {GameCardStack} addStack
 * @property {GameCardStack} removeStack
 * 
 */
const gameReducer = (state, action) => {
  const data = action.data;
  switch (action.type) {
    /**
     * No params.
     */
    case 'init_game': {
      return initGame();
    }

    /**
     * @param {GameCard} card card to add
     */
    case 'add_card_to_stack': {
      return {...state,
        stacks: state.stacks.map(s => s.id === data.stack.id ? s.addCard(data.card) : s)
      }
    }

    case 'draw_card': {
      return {...state};
    }

    /**
     * No params.
     */
    case 'draw_nextStacks': {
      return {...state,
        nextStacks: state.nextStacks.map((s,i) => {
          if (s.size() > 0) {
            state.stacks[i] = state.stacks[i].addSubStack(s);
            s = s.clear();
            console.log(s);
          }
          if (state.deck.hasCard()) {
            return s.addCard(state.deck.drawCard());
          }
          return s;
        })
      }
    }

    /**
     * @param {GameCardStack} stack new selected stack
     */
    case 'update_selected': {
      return {...state, selected: data.stack.copy()};
    }

    /**
     * @param {GameCardStack} stack stack to add to
     * @param {GameCardStack} subStack substack to add
     */
    case 'add_stack_to_stack': {
      return {...state,
        stacks: state.stacks.map(s => s.id === data.stack.id ? s.addSubStack(data.subStack) : s),
        nextStacks: state.nextStacks.map(s => s.id === data.stack.id ? s.addSubStack(data.subStack) : s),
        submitStacks: state.submitStacks.map(s => s.id === data.stack.id ? s.addSubStack(data.subStack) : s)
      }
    }

    /**
     * @param {GameCardStack} stack stack to remove from
     * @param {GameCardStack} subStack substack to remove
     */
    case 'remove_stack_from_stack': {
      return {...state,
        stacks: state.stacks.map(s => s.id === data.stack.id ? s.removeSubStack(data.subStack) : s),
        nextStacks: state.nextStacks.map(s => s.id === data.stack.id ? s.removeSubStack(data.subStack) : s),
        submitStacks: state.submitStacks.map(s => s.id === data.stack.id ? s.removeSubStack(data.subStack) : s)
      }
    }

    default:
      throw new Error('Unknown game action');
  }
};

function initGame() {
  const game = INIT_STATE;

  // create deck
  game.deck.setRanks(game.ranks);
  game.deck.setSuits(game.suits);
  game.deck.generateDeck();

  // create slots
  for (let i=0; i<GAME_CONFIG.initial_slots; i++) {
    game.stacks.push(new GameCardStack());
    game.nextStacks.push(new GameCardStack());
  }

  // fill slots
  for (let i=0; i<game.stacks.length; i++) {
    for (let j=0; j<GAME_CONFIG.initial_deals; j++) {
      game.stacks[i].cards.push(game.deck.drawCard());
    }
  }

  return {...game};
}