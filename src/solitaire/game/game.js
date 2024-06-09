import { useEffect } from 'react';
import { useGameContext, useGameDispatch } from './gameContext';
import { Card, Board } from './';

import './game.css';

const Game = () => {
  const game = useGameContext(), gameDispatch = useGameDispatch();

  useEffect(() => {
    gameDispatch({ type: 'init_game' });
    gameDispatch({ type: 'draw_nextStacks' });
  }, [])
  
  return (
    <div className="game-component">
      <Board />
      <div className="stats-container">
        <div className="submit-display">
          Submitted: {} ({game.score} pts)
        </div>
        <p>Turns: x</p>
        <p>Deck Remaining: {game.deck.activeDeck.length} / {game.deck.deck.length}</p>
        <div className="deck-display">{game.deck.activeDeck.map(card => <Card card={card} />)}</div>
        <p>Modifiers</p>
      </div>
    </div>
  );
}
export default Game;