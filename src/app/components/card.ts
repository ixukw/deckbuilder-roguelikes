/**
 * Goal: bind modifiers to a list of functions such that if modifier x is binded to function x, y will execute after x finishes with x's result
 * Alternatively, modifiers "replace" the function they are binded to except the default implementation should still be kept (aka super)
 */
import { getValue } from './tileActions';
import Action from "./action";
import { Suit, Rank } from './gameConfig';

export default class Card {
  rank: number;
  suit: Suit;
  getValue: Function;

  constructor(rank: number, suit: Suit) {
    this.rank = rank;
    this.suit = suit;
    this.getValue = () => {
      return getValue.execute(this);
    }
  }

}
