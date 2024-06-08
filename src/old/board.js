import React, {useState} from 'react';

const displayRanks = {1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9','?':'?'};
const displaySuits = {'?':'',W:'萬',T:'條',B:'筒'};

export function Pokerboard({ ctx, G, moves, playerID }) {
    const [selected, setSelected] = useState([]);

    function handleClick(e) {
        const card = e.target.getAttribute('card');
        if (selected.indexOf(card) !== -1) {
            setSelected(x => x.filter(y => y !== card));
        } else {
            setSelected(x => [...x, card]);
        }
    }
    function getRankSuit(c) {
        const t = c.split('');
        return [displayRanks[t[0]], <br/>,displaySuits[t[1]]];
    }
    function handleFoldClick() {
        moves.fold();
    }
    function handlePlayClick() {
        if (ctx.phase === 'bet') {
            if (selected.length === G.config.BET_LIMIT) {
                moves.betCard(selected[0]);
                setSelected(x => []);
            } else {
                alert(`Must bet ${G.config.BET_LIMIT} card(s)`);
            }
        } else if (ctx.phase === 'play') {
            if (selected.length <= G.config.PLAY_LIMIT) {
                moves.playHand(selected);
                setSelected(x => []);
            } else {
                alert(`Play hand cannot exceed ${G.config.PLAY_LIMIT} card(s)`);
            }
        }
    }
    return (
        <div className="game-container">
            <h3>You are Player {playerID}.<br/>Player {ctx.currentPlayer}'s Turn to {ctx.phase}.</h3>
            {/*<h4>Your HP: {G.shared.hp[playerID]}. Enemy HP: {G.shared.hp[(playerID === '0' ? '1' : '0')]}</h4>*/}
            <div className="previous">Previous Hand Played: {G.config.previous.map(x => <p>{x}</p>)}</div>
            {/*<button onClick={handleFoldClick}>Fold</button>*/}
            {ctx.phase !== 'win' && <button onClick={handlePlayClick}>{ctx.phase === 'bet' ? 'Bet' : 'Play'}</button>}
            {ctx.phase === 'win' && <button onClick={() => moves.reset()}>Ready Reset</button>}
            <div className="display-container">
                <div className="upper-row">
                    {ctx.phase === 'play' && <div className="play-container">
                        Played:
                        <div className="played-container">
                            {Object.keys(G.shared.played).map(x =>
                                <div className="played-container-player">
                                    Player {x}:
                                    <div className="p1-bets">
                                        {G.shared.played[x].map(c => <div className={`card suit-${c.split('')[1]}`}>{getRankSuit(c)}</div>)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>}
                    {<div className="card-container">
                        Bets:
                        <div className="bets-container">
                            {Object.keys(G.shared.bet).map(x =>
                                <div>
                                    Player {x}:
                                    <div className="p1-bets">
                                        {G.shared.bet[x].map(c => <div className={`card suit-${c.split('')[1]}`}>{getRankSuit(c)}</div>)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>}
                </div>
            </div>
            <div className="hand-container card-container">
                Your Hand:
                <div className="p1-hand">
                    {G.players[playerID].hand.map(x => <div card={x} className={`card suit-${x.split('')[1]}${selected.indexOf(x) !== -1 ? ' selected' : ''}`} onClick={handleClick}>{getRankSuit(x)}</div>)}
                </div>
                <div className="deck">
                    <div className="card">
                        {G.players[playerID].deck.length} / {G.deck.length}
                    </div>
                </div>
            </div>
        </div>
    );
}