/**
 * (done) Goal: bind modifiers to a list of functions such that if modifier x is binded to function x, y will execute after x finishes with x's result
 * Alternatively, modifiers "replace" the function they are binded to except the default implementation should still be kept (aka super)
 * 
 * issue: cannot bind functions specifically to 1 card anymore, since the actions are wrapped
 * idea: interface Modifier, with cardmodifier, tagmodifier, funcmodifier, etc. extends modifier
 * additionally, modifier execution needs to occur somewhere with game state access (higher up)
 * 
 * examples: modifier: this card gains double gold. tag: gold: gain 1$ on scoring.
 */
import { getValue } from './cardActions';
import { executeAction } from './action';
import { Suit, Rank } from './gameConfig';
import { Modifier } from './modifier';
import { v4 as uuid } from 'uuid';

export type Card = {
  id: String,
  rank: number,
  suit: Suit,
  getValue: Function,
  modifiers: Modifier[],
}

export const newCard = (rank: number, suit: Suit, modifiers: Modifier[] = []): Card => {
  return {
    id: uuid(),
    rank: rank,
    suit: suit,
    modifiers: modifiers,
    getValue: (c: Card) => {
      console.log(c)
      return executeAction(getValue, c);
    }
  };
}

export const addModifier = (card: Card, modifier: Modifier): Card => {
  console.log(card.modifiers)
  return {...card, modifiers: [...card.modifiers, modifier]};
}

export const getCardValue = (card: Card): number => {
  return executeAction(getValue, card)
}

export const cardToString = (card: Card): String => {
  return `${Rank[card.rank]} of ${Suit[card.suit]}`;
}
/*
class Card {
  id: String;
  rank: number;
  suit: Suit;
  getValue: Function;
  //tags: TagModifier[];
  modifiers: Modifier[];

  constructor(rank: number, suit: Suit, modifiers: Modifier[] = []) {
    this.id = uuid();
    this.rank = rank;
    this.suit = suit;
    this.modifiers = modifiers;
    this.getValue = () => {
      return getValue.execute(this);
    }
  }

  addModifier(modifier: Modifier): void {
    this.modifiers = [...this.modifiers, modifier];
  }

  removeModifier(modifier: Modifier): void {
    this.modifiers = this.modifiers.filter(x => x != modifier);
  }

  toString() {
    return `${Rank[this.rank]} of ${Suit[this.suit]}`;
  }

  getId() {
    return String(this.id);
  }
}
*/