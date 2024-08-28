import { Card, Action, Modifier } from './';

const getValueFunc = (card: Card.Card): number => {
  return card.rank;
}

// todo: wrap each modifier function with a prev value param
// todo: priority
// todo: action execute chaining to any other action, rather than successive
// note: the input output of modifiers must match the original function
export const getValue = Action.newAction(getValueFunc,
  [
    Modifier.newModifier('Double Face Value', (card: Card.Card, prevValue: number): number => { return card.rank > 10 ? prevValue * 2 : prevValue; }, true, 'doubles value of faces'),
    Modifier.newModifier('Double Jack Value', (card: Card.Card, prevValue: number): number => { return card.rank === 11 ? prevValue * 2 : prevValue; }, true, 'doubles value of jacks')
  ]
);

const getValueModData = [
  {
    name: 'Double Face Value',
    desc: '',
    active: false,
    func: (card: Card.Card, prevValue: number): number => { return card.rank > 10 ? prevValue * 2 : prevValue; },
  },
]