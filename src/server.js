import { Server, Origins } from 'boardgame.io/server';
import { pokergame } from './game';
import cors from '@koa/cors';

const server = Server({
  games: [pokergame],
  origins: ["localhost:3000", "*"],
});

server.app.use(cors({origin: "*"}));
server.run(process.env.PORT);