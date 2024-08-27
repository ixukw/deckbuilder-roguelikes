import { Action, newAction } from "./action";
import { Card } from './card';
import { Modifier, newModifier } from "./modifier";

const getValueFunc = (card: Card) => {
  return card.rank;
}

// todo: wrap each modifier function with a prev value param
// todo: priority
// todo: action execute chaining to any other action, rather than successive
export const getValue = newAction(getValueFunc,
  [
    newModifier('Double Face Value', (card: Card, prevValue: number): number => { return card.rank > 10 ? prevValue * 2 : prevValue; }, true),
    newModifier('Double Jack Value', (card: Card, prevValue: number): number => { return card.rank === 11 ? prevValue * 2 : prevValue; }, true)
  ]
);

const getValueModData = [
  {
    name: 'Double Face Value',
    desc: '',
    active: false,
    func: (card: Card, prevValue: number): number => { return card.rank > 10 ? prevValue * 2 : prevValue; },
  },
]