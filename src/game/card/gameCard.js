import { v4 as uuid } from 'uuid';
export default class GameCard {
  constructor(rank, suit) {
    this.id = uuid();
    this.rank = rank;
    this.suit = suit;
  }

  copy() {
    const c = new GameCard();
    c.id = this.id;
    c.rank = this.rank;
    c.suit = this.suit;
    return c;
  }

  equals(card) {
    return this.rank === card.rank && this.suit === card.suit && this.id === card.id;
  }

  value() {
    return this.rank; // TODO: fetch rank dynamically in case value of rank changes mid play
  }

  toString() {
    return this.rank+this.suit;
  }
}