//import { useState, useEffect } from 'react';
import { useGameContext, useGameDispatch } from './gameContext';
import { Card, Board } from './';

import './game.css';

const Game = () => {
  const game = useGameContext(), gameDispatch = useGameDispatch();

  /*
  function onSubmitEvent(e) {
    if (selected.length > 0) {
      const sel = [...selected];
      setSubmitted(selected);
      setSelected([]);

      // remove stack
      let cols = [...colsState];
      cols[selectedOrigin[0]].splice(Number(selectedOrigin[1]),sel.length);
      
      setCols(cols);
    }
  }*/
  
  return (
    <div className="game-component">
      <Board />
      <div className="stats-container">
        <div className="stack-select">
          Selected Stack: {}
        </div>
        <div className="submit-display">
          Submitted: {} ({game.score} pts)
        </div>
        <p>Turns: x</p>
        <p>Deck Remaining: {game.currentDeck.length} / {game.deck.length}</p>
        <div className="deck-display">{game.currentDeck.map(card => <Card card={card} />)}</div>
        <p>Modifiers</p>
      </div>
    </div>
  );
}
export default Game;