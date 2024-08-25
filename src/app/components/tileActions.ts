import Action from "./action";
import Card from './card';
import Modifier from "./modifier";

const getValueFunc = (card: Card) => {
  console.log('card:',card)
  return card.rank;
}

// todo: wrap each modifier function with a prev value param
export const getValue = new Action(getValueFunc,
  [
    new Modifier('Double Face Value', (card: Card, prevValue: number): number => { return card.rank > 10 ? prevValue * 2 : prevValue; }, true),
    new Modifier('Double Jack Value', (card: Card, prevValue: number): number => { return card.rank === 11 ? prevValue * 2 : prevValue; }, true)
  ]);