import { checkValid } from "../util";

/**
 * a stack of cards
 */
export default class GameCardStack {

  /**
   * @param {GameCard[]} cards initialize stack with array of cards 
   * @param {Boolean} active determines clickable and modifable attributes
   */
  constructor(cards=[], active=false) {
    this.cards = cards;
    this.active = active;
  }

  addCard(card) {
    this.cards.push(card);
  }

  addSubStack(stack) {
    this.cards = [...this.cards, stack]
  }

  getSubStack(card) {
    let next = this.cards.indexOf(card)+1;
    let siblings = [card];
    
    while (next) {
    //  console.log(next);
      const nextVal = next.attributes.card.value;
      siblings.unshift(nextVal);
      next = next.nextElementSibling;
    }
    
    let stack = [siblings[0]];
    //console.log(siblings);
    for (let i=1; i<siblings.length; i++) {
      if (checkValid(siblings[i], siblings[i-1])) {
    //    console.log("pushing " + siblings[i])
        stack.push(siblings[i]);
      }
    }

    console.log("stack", stack);
    if (stack.includes(card.value())) {
      console.log("valid");
      //const t = e.target.attributes.ind.value.split(',');
      //return [stack, [t[0],t[1]]];
    }
    return [[],[]];
  }

  removeSubStack(card) {

  }

  clear() {
    this.cards = [];
  }

  toString() {
    return this.cards.join();
  }
}