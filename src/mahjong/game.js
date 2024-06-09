import { PlayerView } from 'boardgame.io/core';

const ranks = ['1','2','3','4','5','6','7','8','9'];
const suits = ['W','T','B'];

let deck = [];
for (const rank of ranks) {
    for (const suit of suits) {
        for (let i=0; i<4; i++) {
            deck.push(`${rank}${suit}`);
        }
    }
}

function drawCard(hand, deck) {
    hand.push(deck.splice(Math.floor(Math.random()*deck.length),1)[0]);
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
        },
        deck: deck
    };
    for (const k in gameState.players) {
        gameState.players[k].hand = [];
        gameState.players[k].bet = [];
        gameState.players[k].played = [];
        for (let j=0; j<14; j++) {
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
        playHand
    },

    phases: {
        play: {
            moves: { playHand },
            next: 'bet',
            onEnd: ({G, ctx, events}) => {
                const p0_hand = [...[...G.players[0].played, ...G.players[0].bet], ...G.players[1].bet];
                const p1_hand = [...[...G.players[1].played, ...G.players[0].bet], ...G.players[1].bet];
                
                console.log(p0_hand, p1_hand);
                resetRound(G);
                
                if (G.shared.hp['0'] <= 0) {
                    events.setPhase('win');
                } else if (G.shared.hp['1'] <= 0) {
                    events.setPhase('win');
                }
            },
            endIf: ({G, ctx}) => (G.players['0'].played.length > 0 && G.players['1'].played.length > 0)
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
    maxPlayers: 8,
};