'use client';

import styles from "./page.module.css";

import {Card,  newCard, addModifier, cardToString, getCardValue } from "../components/card";
import { Suit, Rank } from '../components/gameConfig';
import {Modifier,  newModifier } from "../components/modifier";

import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const [selectedCard, setCard] = useState<Card>();
  const [deck, setDeck] = useState<Card[]>([]);
  function addModToCard() {
    if (selectedCard) {
      const card = addModifier(selectedCard, newModifier('Gold', () => {}, false, 'Gain $1 when scored'));
      setDeck(d => d.filter(c => c.id != selectedCard.id))
      setDeck(d => [...d, card])
      setCard(card);
    }
  }

  useEffect(() => {
    setDeck(Object.values(Rank).filter(x => !isNaN(Number(x))).map(r => Object.values(Suit).filter(x => !isNaN(Number(x))).map(s => newCard(Number(r),Number(s)))).flat());
    console.log(deck);

    const t = newCard(11,1);
    console.log(getCardValue(t))
  }, [])
  return (
    <div>
      <h1>/modify</h1>
      <div className={styles.modifyPageBody}>
        <div>
          Select card to modify
          <select>
            {deck.sort((a,b) => a.rank - b.rank).map(card =>
              <option key={String(card.id)} value={String(card.id)} onClick={(e) => {
                setCard({...deck.filter(x => x.id === e.currentTarget.value)[0]})
              }}>
                {cardToString(card)}
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
            <p>{cardToString(selectedCard)} ({selectedCard.rank} of {selectedCard.suit})</p>
            <p>{selectedCard.id}</p>
            <p>Modifiers ({selectedCard.modifiers.length > 0 ? selectedCard.modifiers.length : 0})</p>
            {selectedCard.modifiers.map(m => <p key={String(m.id)}><strong>{m.name}</strong>: {m.description} (active: {m.active.toString()})</p>)}
          </div>}
        </div>
      </div>
    </div>
  );
}