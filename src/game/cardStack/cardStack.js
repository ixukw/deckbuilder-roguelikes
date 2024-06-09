import { useRef } from 'react';
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
  const stackRef = useRef();

  function onClickCardEvent(e, card) {
    if (stack.active) {
      const subStack = stack.getSubStack(card);
      
      // TODO: midstack pickup/down functionality
      if (game.selected.size() > 0) { // place selected on cardstack
        gameDispatch({ type: 'add_stack_to_stack', data: { stack: stack, subStack: game.selected }});
        gameDispatch({ type: 'update_selected', data: { stack: new GameCardStack() }});
      } else if (subStack.size() > 0) { // pick up cardstack
        gameDispatch({ type: 'update_selected', data: { stack: subStack }});
        gameDispatch({ type: 'remove_stack_from_stack', data: { stack: stack, subStack: subStack }});
      }
    }
  }

  function onClickBlankEvent(e) {
    if (stack.active) {
      if (game.selected.size() > 0) {
        gameDispatch({ type: 'add_stack_to_stack', data: { stack: stack, subStack: game.selected }});
        gameDispatch({ type: 'update_selected', data: { stack: new GameCardStack() }});
      }
    }
  }

  return (
    <div className={`stack-component hand vhand-compact ${stack.active ? 'active-hand' : ''}`} ref={stackRef}>
      {stack.size() > 0 ?
      stack.cards.map((card, i) => <Card card={card} onClick={(e) => {onClickCardEvent(e, card)}} />)
      : <div className="slot" onClick={onClickBlankEvent}></div>
      }
    </div>
  );
}
export default CardStack;