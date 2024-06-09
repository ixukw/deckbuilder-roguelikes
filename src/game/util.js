import { GameCardStack, GameDeck } from './';

export const INIT_STATE = {
  ranks: {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':11,'Q':12,'K':13,'A':1},
  suits: ['S','C','D','H'],

  deck: new GameDeck(),

  stacks: [],
  nextStacks: [],
  //nextBuffer: [],

  selected: new GameCardStack([], false),
  submitStacks: [new GameCardStack()],
  score: 0,
}

export const GAME_CONFIG = {
  initial_slots: 4,
  initial_deals: 3,
}

// this should go somewhere with game logic
/**
 * Returns if card1 can stack on card2
 * 
 * @param {GameCard} card1 card to stack
 * @param {GameCard} card2 card on stack
 * @returns {Boolean} validity if card1 can stack on card2
 */
export function checkValid(card1, card2) {
  return getRankValue(card2.rank) - getRankValue(card1.rank) === 1 && card1.suit !== card2.suit;
}

export function getRankValue(rank) {
  return INIT_STATE.ranks[rank];
}

export function getScore(hand) {
  let score = 0;
  for (const card of hand) {
    score += Number(card.split(',')[0]);
  }
  return score;
}