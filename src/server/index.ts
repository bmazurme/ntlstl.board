/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { config as dotEnvConfig } from 'dotenv';
import http from 'http';
import WebSocket from 'ws';

import index from './routes';
import onConnection from './socket';
import { NotFoundError } from './errors';

import { errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/error-handler';

import { helmetConfig } from './utils/helmet-config';
import { corsOptions } from './utils/cors-options';

dotEnvConfig();

const pth = process.env.PTH ?? 'mongodb://127.0.0.1:27017/wapi';
const port = process.env.PORT ?? 3001;
const portWss = process.env.PORT_WSS ?? 3002;

const app = express();

mongoose.connect(pth, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

app.use(cors(corsOptions));
app.use(helmet.contentSecurityPolicy(helmetConfig));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize a simple http server
const server = http.createServer(app);
// initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws: WebSocket) => onConnection(ws));

app.use('/static', express.static(path.resolve(process.cwd(), 'static')));
app.use(express.static(path.resolve(__dirname), { extensions: ['css', 'js', 'woff', 'woff2'] }));

app.use('/api/', index);

app.get('/:page', (_req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
});

app.use('*', () => {
  throw new NotFoundError('HTTP 404 Not Found');
});

app.use(errorLogger);
// app.use(errors());
app.use(errorHandler);

// start server
server.listen(portWss, () => {
  console.log(`WSS listening on port ${portWss}`);
});

app.listen(port, () => {
  console.log(`HTTP listening on port ${port}`);
});
