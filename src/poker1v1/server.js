import { Server, Origins } from 'boardgame.io/server';
import { pokergame } from './game';
import cors from '@koa/cors';

const server = Server({
  games: [pokergame],
  origins: ["localhost:3000", "*", "https://ixukw.github.io/poker-roguelike", Origins.LOCALHOST],
});

server.app.use(cors({origin: "*"}));
server.run(8080);
//server.run(process.env.PORT);