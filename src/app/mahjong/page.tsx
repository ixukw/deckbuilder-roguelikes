
import styles from "./page.module.css";

import Card from "../components/card";

export default function Page() {
  const jack = new Card(11, 4);
  console.log(jack.getValue());
  return (
    <h1>/mahjong</h1>
  );
}