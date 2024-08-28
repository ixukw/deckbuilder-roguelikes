'use client';

import styles from "./page.module.css";

import { Card, Modifier, GameConfig, ActionQueue, Action } from '../components';
import { v4 as uuid } from 'uuid';

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
    t.getValue(t)
  }, []);

  return (
    <div>
      <h1>/modify</h1>
      <div className={styles.modifyPageBody}>
        <div>
          <p>Select card to modify&nbsp;
            <select>
              {deck.sort((a,b) => a.rank - b.rank).map(c =>
                <option key={c.id} value={c.id} onClick={(e) => setCard({...deck.filter(x => x.id === e.currentTarget.value)[0]})}>
                  {Card.cardToString(c)}
                </option>
              )}
            </select>
          </p>

          <p>Add existing modifier&nbsp;
            <select>
              
            </select>
            <button onClick={addModToCard}>Add</button>
          </p>

          <p>Create new modifier</p>
          <p>Action to bind&nbsp;
            <select>

            </select>
          </p>
          Modifier<textarea></textarea><button>Add</button>
        </div>
        <div>
          Card Data
          {selectedCard && <div>
            {Card.cardToString(selectedCard)}<br/>
            {selectedCard.id}<br/>
            Modifiers: ({selectedCard.modifiers.length > 0 ? selectedCard.modifiers.length : 0})<br/>
            {selectedCard.modifiers.map(m => Modifier.modifierToJSX(m))}
          </div>}
        </div>
        <div className={styles.eventPanel}>
          Add Event<br/>
          <button onClick={() => {

          }}>Score card</button>
          <button>Score all</button>
          <button>Start Round</button>
          <button>End Round</button>
          <button>Draw</button>
          <button>Discard</button>
        </div>
        <div>
          Global Action Queue &nbsp;
          <button>Process All</button><br/>
          {ActionQueue.actionQueueToJSX(ActionQueue.globalActionQueue)}
        </div>
      </div>
    </div>
  );
}