import { PlayerView } from 'boardgame.io/core';
//const HandSolver = require('pokersolver').Hand;

const ranks = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
const suits = ['S','D','C','H'];

let deck = [];
for (const rank of ranks) {
    for (const suit of suits) {
        deck.push(`${rank}${suit}`);
    }
}

function drawCard(hand, deck) {
    hand.push(deck.splice(Math.floor(Math.random()*deck.length),1)[0]);
}

function betCard({G, playerID}, card) {
    G.players[playerID].bet.push(card);
    G.players[playerID].hand.splice(G.players[playerID].hand.indexOf(card),1);
    drawCard(G.players[playerID].hand, G.players[playerID].deck);
    if (playerID === '0') {
        G.shared.bet['0'].push('?');
    } else {
        G.shared.bet['1'].push('?');
    }
    //G.config.previous = [...G.config.previous, `Player ${playerID} bet a card`];
}

function addHand({G, playerID}, card) {
    const playedCardIndex = G.players[playerID].played.indexOf(card);
    if (playedCardIndex !== -1) {
        G.players[playerID].played.splice(playedCardIndex, -1);
    } else {
        G.players[playerID].played.push(card);
    }
}

function playHand({G, playerID}, hand) {
    G.players[playerID].played = hand;
    G.players[playerID].played.forEach(x => {
        G.players[playerID].hand.splice(G.players[playerID].hand.indexOf(x),1);
        drawCard(G.players[playerID].hand, G.players[playerID].deck);
    });
    G.shared.played[playerID] = hand.map(x => '?');
    //G.config.previous = [...G.config.previous, `Player ${playerID} played ${hand.length} cards`];
}
function fold({G, playerID, events}) {
    G.players[playerID].folded = true;
}
function reset({G, playerID}) {
    G.players[playerID].reset = true;
}

function resetRound(G) {
    G.players['0'].bet = [];
    G.players['1'].bet = [];
    G.shared.bet = {'0': [], '1': []}
    G.players['0'].played = [];
    G.players['1'].played = [];
    G.shared.played['0'] = [];
    G.shared.played['1'] = [];
    //G.players[0].folded = false;
    //G.players[1].folded = false;
}
function initState() {
    const gameState = {
        players: {
            '0': {
                hand: [],
                played: [],
                bet: [],
                deck: deck.slice(0,52),
                folded: false,
                reset: false,
            },
            '1': {
                hand: [],
                played: [],
                bet: [],
                deck: deck.slice(0,52),
                folded: false,
                reset: false,
            }
        },
        shared: {
            bet: {
                '0': [],
                '1': []
            },
            played: {
                '0': [],
                '1': []
            },
            hp: {
                '0': 50,
                '1': 50,
            }
        },
        config: {
            BET_LIMIT: 1,
            TOTAL_BET_LIMIT: 3,
            PLAY_LIMIT: 2,
            previous: ['start']
        }
    };
    for (const k in gameState.players) {
        gameState.players[k].hand = [];
        gameState.players[k].bet = [];
        gameState.players[k].played = [];
        for (let j=0; j<6; j++) {
            drawCard(gameState.players[k].hand, gameState.players[k].deck);
        }
    }
    console.log(getHandDetails(gameState.players[0].hand));
    console.log(getHandDetails(gameState.players[1].hand))
    
    return gameState;
}

export const pokergame = {
    setup: initState,

    turn: {
        minMoves: 1,
        maxMoves: 1,
        onBegin: ({ G, ctx, events, random, ...plugins }) => {
            if (ctx.phase === 'bet') {
                if (G.shared.bet['0'].length === G.shared.bet['1'].length) {
                    G.shared.bet['0'] = G.players['0'].bet;
                    G.shared.bet['1'] = G.players['1'].bet;
                }
            }
        },
        
    },

    moves: {
        betCard, playHand, addHand
    },

    phases: {
        bet: {
            moves: { betCard, fold },
            start: true,
            next: ({G}) => { return G.players[0].folded || G.players[1].folded ? 'fold' : 'play' },
            onBegin: ({G, ctx}) => {
                G.shared.bet['0'] = [];
                G.shared.bet['1'] = [];
                G.players[0].bet = [];
                G.players[1].bet = [];
            },
            onEnd: ({G, ctx}) => {
                G.shared.bet['0'] = G.players['0'].bet;
                G.shared.bet['1'] = G.players['1'].bet;
            },
            endIf: ({G, ctx}) => ((G.players[0].folded || G.players[1].folded) || (G.players[0].bet.length === G.config.TOTAL_BET_LIMIT && G.players[1].bet.length === G.config.TOTAL_BET_LIMIT))
        },
        play: {
            moves: { addHand, playHand },
            next: 'bet',
            onEnd: ({G, ctx, events}) => {

                const p0_hand = [...[...G.players[0].played, ...G.players[0].bet], ...G.players[1].bet];//HandSolver.solve([...G.players[0].played, ...G.players[0].bet, ...G.players[1].bet]);
                const p1_hand = [...[...G.players[1].played, ...G.players[0].bet], ...G.players[1].bet];//HandSolver.solve([...G.players[1].played, ...G.players[0].bet, ...G.players[1].bet]);
                //p0_hand.index = 0;
                //p1_hand.index = 1;
                //const winner = HandSolver.winners([p0_hand, p1_hand]);
                console.log(p0_hand, p1_hand);
                
                //console.log('WINNER',winner[0].index, winner, winner[0].values);
                const p0_score = getHandDetails(p0_hand);
                const p1_score = getHandDetails(p1_hand);
                console.log(p0_score, p1_score);
                let winner = -1;
                if (p0_score.rank < p1_score.rank) {
                    winner = 0;
                } else if (p0_score.rank > p1_score.rank) {
                    winner = 1;
                } else {
                    console.log(p0_score.value.localeCompare(p1_score.value));
                    if (p0_score.value.localeCompare(p1_score.value) > 0) {
                        winner = 0;
                    } else {
                        winner = 1;
                    }
                }

                if (winner === 0) {
                    G.shared.hp['1'] -= getSum(G.players[0].bet);//HandSolver.solve([G.players[0].bet]).game.handValues.reduce((t,a) => t+a,0);
                } else if (winner === 1) {
                    G.shared.hp['0'] -= getSum(G.players[1].bet);//HandSolver.solve([G.players[1].bet]).game.handValues.reduce((t,a) => t+a,0);
                } else {
                    G.config.previous = [...G.config.previous, 'draw'];
                }

                if (winner !== -1) {
                    G.config.previous = [...G.config.previous, `P0 played: ${G.players[0].played}. P1 played: ${G.players[1].played}.`,
                                        `Prev bets: P0: ${G.players[0].bet}, P1: ${G.players[1].bet} ` ,
                                        `${winner === 0 ? `P0 won, P1 took ${getSum(G.players[0].bet)} dmg` : `P1 won, P0 took ${getSum(G.players[1].bet)} dmg`}`]
                }
                resetRound(G);
                
                if (G.shared.hp['0'] <= 0) {
                    events.setPhase('win');
                } else if (G.shared.hp['1'] <= 0) {
                    events.setPhase('win');
                }
            },
            endIf: ({G, ctx}) => (G.players['0'].played.length > 0 && G.players['1'].played.length > 0)
        },
        fold: {
            moves: {},
            next: ({G}) => { return G.shared.hp[0] > 0 && G.shared.hp[1] > 0 ? 'bet' : 'win' },
            onBegin: ({G, ctx}) => {
                console.log("folded")
                if (G.players[0].folded) {
                    G.shared.hp[0] -= getSum(G.players[1].bet);
                    G.config.previous = [...G.config.previous, `P0 folded, took ${getSum(G.players[1].bet)} dmg`];
                } else if (G.players[1].folded) {
                    G.shared.hp[1] -= getSum(G.players[0].bet);
                    G.config.previous = [...G.config.previous, `P1 folded, took ${getSum(G.players[0].bet)} dmg`];
                }
                resetRound(G);
                G.players[0].folded = false;
                G.players[1].folded = false;
            },
            
            endIf: ({G, ctx}) => (!G.players[0].folded && !G.players[1].folded)
        },
        win: {
            moves: { reset },
            next: 'bet',
            onBegin: ({G, ctx}) => {
                if (G.shared.hp['0'] <= 0) {
                    G.config.previous = [...G.config.previous, 'P1 win'];
                } else if (G.shared.hp['1'] <= 0) {
                    G.config.previous = [...G.config.previous, 'P0 win'];
                }
            },
            onEnd: ({G, ctx, events}) => {
                resetRound(G);
                G = initState();
                events.setPhase('bet');
            },
            endIf: ({G, ctx}) => (G.players[0].reset && G.players[1].reset)
        }
    },

    playerView: PlayerView.STRIP_SECRETS,
    minPlayers: 2,
    maxPlayers: 2,
};

function getSum(hand) {
    const values = {2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9, T: 10, J: 10, Q: 10, K: 10, A: 11};
    return hand.reduce((sum, c) => sum + values[c.split('')[0]], 0)
}

const order = "23456789TJQKA";
//const conversion = {};

function getHandDetails(hand) {
    const cards = hand//.split(" ")
    const faces = cards.map(a => String.fromCharCode([77 - order.indexOf(a[0])])).sort()
    const suits = cards.map(a => a[1]).sort()
    const counts = faces.reduce(count, {})
    const duplicates = Object.values(counts).reduce(count, {})
    const flush = suits.every(c => c = suits[0]);
    const first = faces[0].charCodeAt(0)
    const lowStraight = faces.join("") === "AJKLM"
    faces[0] = lowStraight ? "N" : faces[0]
    const straight = lowStraight || faces.every((f, index) => f.charCodeAt(0) - first === index)
    const rankOrder =
        (flush && straight && 1) ||
        (duplicates[4] && 2) ||
        (duplicates[3] && duplicates[2] && 3) ||
        (flush && 4) ||
        (straight && 5) ||
        (duplicates[3] && 6) ||
        (duplicates[2] > 1 && 7) ||
        (duplicates[2] && 8) ||
        9

    return { rank: rankOrder, value: faces.sort(byCountFirst).join("") }

    function byCountFirst(a, b) {
        //Counts are in reverse order - bigger is better
        const countDiff = counts[b] - counts[a]
        if (countDiff) return countDiff // If counts don't match return
        return b > a ? -1 : b === a ? 0 : 1
    }
    function count(c, a) {
        c[a] = (c[a] || 0) + 1
        return c
    }
}