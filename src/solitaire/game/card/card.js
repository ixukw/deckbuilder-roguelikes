import { GameCard } from '../';

import './card.css';

/**
 * Component for GameCard
 * 
 * @param {GameCard} card class GameCard Object to display
 * @param {Function} onClick onClick event
 * @returns 
 */
const Card = ({ card=new GameCard(), onClick }) => {

  return (
    <div className="card-component">
      <img className='card'
        src={`/deckbuilder-roguelikes/cards/${card.rank+card.suit}.svg`}
        onClick={onClick}
        card={card.rank+card.suit} ind={card}
        alt={card.rank+card.suit}
      />
    </div>
  );
}
export default Card;