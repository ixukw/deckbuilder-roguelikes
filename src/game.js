import { PlayerView } from 'boardgame.io/core';
const HandSolver = require('pokersolver').Hand;

const ranks = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
const suits = ['s','d','c','h'];

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
    G.shared.played[playerID] = hand.map(x => '?');
}

function initState() {
    const gameState = {
        players: {
            '0': {
                hand: [],
                played: [],
                bet: [],
                deck: deck.slice(0,52),
            },
            '1': {
                hand: [],
                played: [],
                bet: [],
                deck: deck.slice(0,52),
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
            moves: { betCard },
            start: true,
            next: 'play',
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
            endIf: ({G, ctx}) => (G.players[0].bet.length === G.config.TOTAL_BET_LIMIT && G.players[1].bet.length === G.config.TOTAL_BET_LIMIT)
        },
        play: {
            moves: { addHand, playHand },
            next: 'bet',
            onEnd: ({G, ctx}) => {

                const p1_hand = HandSolver.solve([...G.players[0].played, G.players[0].bet, G.players[1].bet]);
                const p2_hand = HandSolver.solve([...G.players[1].played, G.players[0].bet, G.players[1].bet]);
                const winner = HandSolver.winners([p1_hand, p2_hand]);
                
                console.log(winner);

                if (p1_hand === winner) {
                    G.shared.hp['1'] -= 1//HandSolver.solve([G.players[0].bet]).game.handValues.reduce((t,a) => t+a,0);
                } else {
                    G.shared.hp['0'] -= 1//HandSolver.solve([G.players[1].bet]).game.handValues.reduce((t,a) => t+a,0);
                }

                G.players['0'].played = [];
                G.players['1'].played = [];
                G.shared.played['0'] = [];
                G.shared.played['1'] = [];
                if (G.shared.hp['0'] === 0) {
                    alert('P1 win');
                } else if (G.shared.hp['1'] === 0) {
                    alert('P2 win');
                }
            },
            endIf: ({G, ctx}) => (G.players['0'].played.length > 0 && G.players['1'].played.length > 0)
        },
    },

    playerView: PlayerView.STRIP_SECRETS,
    minPlayers: 2,
    maxPlayers: 2,
};