export default class GameCard {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  value() {
    return this.rank; // TODO: fetch rank dynamically in case value of rank changes mid play
  }

  toString() {
    return this.rank+this.suit;
  }
}