import { useEffect } from 'react';
import { useGameContext, useGameDispatch } from './gameContext';
import { GameCard, Card, Board } from './';

import './game.css';

const Game = () => {
  const game = useGameContext(), gameDispatch = useGameDispatch();

  useEffect(() => {
    gameDispatch({ type: 'init_game' });
  }, [])
  
  return (
    <div className="game-component">
      <Board />
      <div className="stats-container">
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