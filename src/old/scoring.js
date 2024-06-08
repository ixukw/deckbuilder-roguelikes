//import ruleset from './ruleset'
/**
 * 
 * 
  // check for specials

  // get the pair and delete it from hand analysis

  // check for all chows

  // check for all kongs

  // check for all pungs

  // determine valid combinations?

  // score combinations

 * @param {Object[]} hand tiles from their own hand
 * @param {Object[]} pool tiles from the shared pool they used
 */
function score(hand, pool) {
  obj = {
    tiles: [],
    hand: [],
    pool: [],
    kong: [],
    pung: [],
    chow: [], 
    pair: [],
    suits: [],
    ranks: []
  }
  for (const rule of ruleset) {
    const pt = rule.func(obj)
    total += pt
  }
}

// hand = [Tile() x 14]
function organize(hand, pool) {
  const combined = [...hand, pool]
  const result = {
    tiles: combined,
    hand: hand,
    pool: pool,
    kong: [],
    pung: [],
    chow: [], 
    pair: [],
    suits: [],
    ranks: [],
  }
  const rankSort = combined.sort((a, b) => a.rank - b.rank);
  const suitSort = combined.sort((a,b) => a.suit.localeCompare(b.suit));

  // find pairs

  let pairs = [];
  let tiles = [...rankSort];
  for (let i=0; i<tiles.length-1; i++) {
    if (tiles[i].equals(tiles[i+1]) && !pairs.includes([tiles[i], tiles[i+1]])) {
      pairs.push([tiles[i], tiles[i+1]]);
      tiles[i]
    }
  }

  // find chows
  let chows = [];
  for (let i=2; i<rankSort.length; i++) {

  }
}

const Tile = class {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  equals(tile) {
    return this.rank === tile.rank && this.suit === tile.suit;
  }
}
const Hand = class {
  constructor(tiles) {
    this.tiles = tiles;
    this.ranks = []
    this.suits = []
  }
}

const testhand = [
  new Tile(1,'w'),
  new Tile(2,'c'),
  new Tile(1,'b'),
  new Tile(2,'c'),
  new Tile(1,'b'),
  new Tile(2,'c'),
  new Tile(6,'w'),
  new Tile(7,'w'),
  new Tile(3,'c'),
  new Tile(4,'c'),
  new Tile(8,'w'),
  new Tile(1,'w'),
  new Tile(1,'b'),
  new Tile(5,'c'),
]