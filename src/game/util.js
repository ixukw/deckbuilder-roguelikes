export const INIT_STATE = {
  ranks: {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':11,'Q':12,'K':13,'A':14},
  suits: ['S','C','D','H'],
  deck: [],
  currentDeck: [],
  selected: {},
  submitted: {},
  stacks: [],
  nextStacks: [],

  score: 0,
}

export const GAME_CONFIG = {
  initial_slots: 4,
}

// this should go somewhere with game logic
export function checkValid(card1, card2) {
  const c1 = card1.split(',');
  const c2 = card2.split(',');
  const v1 = c1[0] === 'J' ? 11 : c1[0] === 'Q' ? 12 : c1[0] === 'K' ? 13 : c1[0] === 'A' ? 1 : c1[0];
  const v2 = c2[0] === 'J' ? 11 : c2[0] === 'Q' ? 12 : c2[0] === 'K' ? 13 : c2[0] === 'A' ? 1 : c2[0];
  //console.log(v1,v2,c1[1],c2[1]);
  return v1 - v2 === 1 && c1[1] !== c2[1];
}

export function getScore(hand) {
  let score = 0;
  for (const card of hand) {
    score += Number(card.split(',')[0]);
  }
  return score;
}