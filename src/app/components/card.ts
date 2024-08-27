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
import { Action, Modifier, GameConfig } from './';
import { v4 as uuid } from 'uuid';

export type Card = {
  id: string,
  rank: number,
  suit: GameConfig.Suit,
  getValue: Function,
  modifiers: Modifier.Modifier[],
}

export const newCard = (rank: number, suit: GameConfig.Suit, modifiers: Modifier.Modifier[] = []): Card => {
  return {
    id: uuid(),
    rank: rank,
    suit: suit,
    modifiers: modifiers,
    getValue: (c: Card) => {
      console.log('getvalue:',c)
      return Action.executeAction(getValue, c);
    }
  };
}

export const addModifier = (card: Card, modifier: Modifier.Modifier): Card => {
  console.log(card.modifiers)
  return {...card, modifiers: [...card.modifiers, modifier]};
}

export const getCardValue = (card: Card): number => {
  return Action.executeAction(getValue, card)
}

export const cardToString = (card: Card): String => {
  return `${GameConfig.Rank[card.rank]} of ${GameConfig.Suit[card.suit]}`;
}