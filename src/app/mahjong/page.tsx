'use client';

import styles from "./page.module.css";

import { Card, Modifier, GameConfig } from '../components';

import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const [selectedCard, setCard] = useState<Card.Card>();
  const [deck, setDeck] = useState<Card.Card[]>([]);

  function addModToCard() {
    if (selectedCard) {
      const card = Card.addModifier(selectedCard, Modifier.newModifier('Gold', () => {}, false, 'Gain $1 when scored'));
      setDeck(d => d.filter(c => c.id != selectedCard.id))
      setDeck(d => [...d, card])
      setCard(card);
    }
  }

  useEffect(() => {
    setDeck(Object.values(GameConfig.Rank).filter(x => !isNaN(Number(x))).map(r => Object.values(GameConfig.Suit).filter(x => !isNaN(Number(x))).map(s => Card.newCard(Number(r),Number(s)))).flat());

    const t = Card.newCard(11,1);
    console.log(Card.getCardValue(t))
  }, [])
  return (
    <div>
      <h1>/modify</h1>
      <div className={styles.modifyPageBody}>
        <div>
          Select card to modify
          <select>
            {deck.sort((a,b) => a.rank - b.rank).map(c =>
              <option key={c.id} value={c.id} onClick={(e) => setCard({...deck.filter(x => x.id === e.currentTarget.value)[0]})}>
                {Card.cardToString(c)}
              </option>
            )}
          </select>

          <br/>Select modifier to add
          <select>
            
          </select>
          <br/><button onClick={addModToCard}>Add</button>
        </div>
        <div>
          Card Data
          {selectedCard && <div>
            <p>{Card.cardToString(selectedCard)} ({selectedCard.rank} of {selectedCard.suit})</p>
            <p>{selectedCard.id}</p>
            <p>Modifiers: ({selectedCard.modifiers.length > 0 ? selectedCard.modifiers.length : 0})</p>
            {selectedCard.modifiers.map(m => <p key={m.id}><strong>{m.name}</strong>: {m.description} (active: {m.active.toString()})</p>)}
          </div>}
        </div>
        <div className={styles.eventPanel}>
          Event Panel<br/>
          <button>Score this</button>
          <button>Score all</button>
          <button>Start Round</button>
          <button>End Round</button>
          <button>Draw</button>
          <button>Discard</button>
        </div>
      </div>
    </div>
  );
}