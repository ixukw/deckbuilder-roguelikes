import { useState, useRef } from 'react';
import { useGameContext, useGameDispatch } from '../gameContext';
import { CardStack } from '../';

import './board.css';

/**
 * Component for the game Board
 * 
 */
const Board = () => {
  const game = useGameContext(), gameDispatch = useGameDispatch();
  const [mouseX, setMouseX] = useState();
  const [mouseY, setMouseY] = useState();
  const selectedRef = useRef();

  function nextCards() {
  }

  function onSubmitEvent(e) {
    if (game.selected.length > 0) {
      gameDispatch({ type: 'updateSubmit' });
    }
  }

  document.addEventListener('mousemove', (e) => {
    setMouseX(e.pageX - 20)
    setMouseY(e.pageY + 5)
  });

  return (
    <div className="board-component">
      <div>
        <p>Next</p>
        
        <div>
          <button onClick={nextCards}>Draw</button>
          {/*<button onClick={() => {}}>Deselect</button>*/}
          <button onClick={onSubmitEvent}>Submit</button>
        </div>
      </div>
      <div>
        <div className="next-slots">
          {game.nextStacks.map((stack, i) => <CardStack stack={stack} />)}
          <CardStack stack={game.submitStacks[0]} />
        </div>
        <div className="solitaire-slots">
          {game.stacks.map((stack, i) => <CardStack stack={stack} /> )}
        </div>
      </div>
      {game.selected.size() > 0 && <div className="selected-stack" ref={selectedRef} style={{ left: `${mouseX}px`, top: `${mouseY}px`}}>
        <CardStack stack={game.selected}/>
      </div>}
    </div>
  );
}
export default Board;