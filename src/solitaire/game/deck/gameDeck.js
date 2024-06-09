import { GameCard } from '../';

export default class GameDeck {
  constructor(ranks={}, suits=[]) {
    this.deck = [];
    this.ranks = ranks;
    this.suits = suits;
    this.activeDeck = [];
  }

  copy() {
    const c = new GameDeck();
    c.deck = this.deck.map(card => card.copy());
    c.ranks = {...this.ranks};
    c.suits = [this.suits];
    c.activeDeck = this.activeDeck.map(card => card.copy());
    return c;
  }

  drawCard() {
    if (this.activeDeck.length > 0) {
      const index = Math.floor(Math.random()*this.activeDeck.length);
      return this.activeDeck.splice(index, 1)[0];
    }
  }

  hasCard() {
    return this.activeDeck.length > 0;
  }

  fillActiveDeck() {
    this.activeDeck = this.deck.map(card => card.copy());
  }

  generateDeck() {
    const t = [];
    for (const r in this.ranks) {
      for (const s of this.suits) {
        t.push(new GameCard(r, s));
      }
    }
    this.deck = [...t];
    this.fillActiveDeck();
    console.log(this);
  }

  setRanks(ranks) {
    this.ranks = ranks;
  }

  setSuits(suits) {
    this.suits = suits;
  }
}