import { Link } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div className="approot-component">
      <h1>Deckbuilder Roguelikes</h1>
      <div className="links">
        <Link to="/poker1v1/">Poker 1v1</Link>
        <Link to="/solitaire/">Solitaire</Link>
        <Link to="/mahjong/">Mahjong</Link>
      </div>
    </div>
  )
}
export default App;