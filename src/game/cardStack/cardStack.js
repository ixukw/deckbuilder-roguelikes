import { useGameContext, useGameDispatch } from '../gameContext';
import { Card, GameCardStack } from '../';

import './cardStack.css';

/**
 * Component for GameCardStack
 * 
 * @param {GameCardStack} stack class GameCardStack Object to display
 */
const CardStack = ({ stack=new GameCardStack() }) => {
  const game = useGameContext(), gameDispatch = useGameDispatch();

  function onClickCardEvent(e) {
    /*const [cStack, target] = getClickStack(e);
    if (cStack.length > 0 && game.selected.length > 0) {
      placeStack(e, game.selected);
    } else if (cStack.length > 0) {
      gameDispatch({ action: 'updateSelected', data: cStack })
    }*/
    
  }

  function getClickStack(e) {
    //return [[],[]];
  }

  function placeStack(e, stack) {
    /*stack.addSubStack(stack);

    // remove stack
    stack.removeSubStack(stack);
    gameDispatch({ action:'updateSelected', data: [] });*/
  }

  return (
    <div className="stack-component hand vhand-compact">
      {stack.cards.length > 0 ?
      stack.cards.map((card, i) => <Card card={card} onClick={onClickCardEvent} />)
      : <div className="slot"></div>
      }
    </div>
  );
}
export default CardStack;