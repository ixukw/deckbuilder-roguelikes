import { CardStack } from '../';
import { useGameContext, useGameDispatch } from '../gameContext';

import './board.css';

/**
 * Component for the game Board
 * 
 */
const Board = () => {
  const game = useGameContext(), gameDispatch = useGameDispatch();

  function nextCards() {
    let cols = [...game.stacks];
    let d2 = [...game.deck];
    for (let i=0; i<cols.length; i++) {
      if (d2.length > 0) {
        const cardInd = Math.floor(Math.random()*(d2.length));
        cols[i].push(d2[cardInd]);
        d2.splice(cardInd, 1);
      }
    }
    gameDispatch({ type: 'update_deck', data: d2 });
    gameDispatch({ type: 'update_stacks', data: cols });
  }

  function onSubmitEvent(e) {
    if (game.selected.length > 0) {
      gameDispatch({ action: 'updateSubmit' });

      // remove stack (TODO: handle this in updateSubmit)
      /*let cols = [...colsState];
      cols[selectedOrigin[0]].splice(Number(selectedOrigin[1]),sel.length);
      
      setCols(cols);*/
    }
  }

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
          <CardStack type="submit" />
          {/*<div className="submit-slot slot" onClick={onClickCardEvent} card='blank' ind='4'>
            Submit
          </div>*/}
        </div>
        <div className="active-hand">
          {game.stacks.map((col, i) => <CardStack stack={col} /> )}
        </div>
      </div>
    </div>
  );
}
export default Board;