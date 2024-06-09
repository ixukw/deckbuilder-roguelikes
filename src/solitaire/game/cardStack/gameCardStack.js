import { v4 as uuid } from 'uuid';
import { checkValid } from "../util";

/**
 * these classes are irrelevant because you cannot pass classes into reducers without fucking it up
 */
export default class GameCardStack {

  /**
   * @param {GameCard[]} cards initialize stack with array of cards 
   * @param {Boolean} active determines clickable and modifable attributes
   */
  constructor(cards=[], active=true, maxSize=64) {
    this.id = uuid();
    this.cards = cards;
    this.active = active;
    this.maxSize = maxSize;
  }
  
  copy() {
    const c = new GameCardStack();
    c.id = this.id;
    c.cards = this.cards.map(card => card.copy());
    c.active = this.active;
    c.maxSize = this.maxSize;
    return c;
  }

  addCard(card) {
    const c = this.copy();
    if (this.size() < this.maxSize) {
      c.cards.push(card);
    }
    return c;
  }

  /**
   * Adds the substack to this stack
   * @param {GameCardStack} stack substack to add
   * @returns {GameCardStack}
   */
  addSubStack(stack) {
    const c = this.copy();
    stack.cards.forEach(card => c.cards.push(card.copy()));
    return c;
  }

  /**
   * Removes the substack from this stack
   * @param {GameCardStack} stack substack to remove
   * @returns {GameCardStack}
   */
  removeSubStack(stack) {
    const c = this.copy();
    c.cards.splice(this.cards.indexOf(stack.cards[0]), stack.cards.length)
    return c;
  }

  /**
   * Returns the substack with specified card as origin
   * @param {GameCard} card card to originate stack from
   * @returns {GameCardStack}
   */
  getSubStack(card) {
    const subStack = [card];
    for (let i=this.cards.indexOf(card)+1; i<this.cards.length; i++) {
      if (checkValid(this.cards[i], this.cards[i-1])) {
        subStack.push(this.cards[i].copy());
      }
    }

    // only if last card in substack is at bottom of stack
    // TODO: change condition to editable generic function
    if (subStack.at(-1).equals(this.cards.at(-1))) {
      return new GameCardStack(subStack);
    }
    return new GameCardStack();
  }

  clear() {
    const c = this.copy();
    c.cards = [];
    return c;
  }

  size() {
    return this.cards.length;
  }
  
  toString() {
    return this.cards.join();
  }
}