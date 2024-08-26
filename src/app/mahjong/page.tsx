'use client';

import styles from "./page.module.css";

import Card from "../components/card";
import { Suit, Rank } from '../components/gameConfig';

export default function Page() {
  const jack = new Card(11, 4);
  console.log(jack.getValue());
  const deck = Object.values(Rank).filter(a => isNaN(Number(a))).map(x => Object.values(Suit).filter(a => isNaN(Number(a))).map(y => `${x} of ${y}`)).flat();

  return (
    <div>
      <h1>/modify</h1>
      <div>
      Select card to modify
      <select>
        {deck.map(card => <option value={card} onClick={() => {}}>{card}</option>)}
      </select>

      <br/>Select modifier to add
      <select>

      </select>
      </div>
      <div>
        Card Data
      </div>
    </div>
  );
}