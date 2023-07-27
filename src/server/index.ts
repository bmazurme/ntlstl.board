/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import express from 'express';
import { config as dotEnvConfig } from 'dotenv';
import http from 'http';
import WebSocket from 'ws';

import index from './routes';
import { NotFoundError } from './errors';

import { errorLogger } from './middlewares/logger';

import errorHandler from './middlewares/error-handler';

dotEnvConfig();

const app = express();
const port = process.env.PORT ?? 3001;

// initialize a simple http server
const server = http.createServer(app);

// initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
  // connection is up, let's add a simple simple event
  ws.on('message', (message: string) => {
    // log the received message and send it back to the client
    console.log('received: %s', message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  // send immediatly a feedback to the incoming connection
  ws.send(JSON.stringify([{
    id: 0, title: 'title', notification: 'text', read: false,
  }]));
});

app.use('/static', express.static(path.resolve(process.cwd(), 'static')));

app.use(express.static(path.resolve(__dirname), { extensions: ['css', 'js', 'woff', 'woff2'] }));

app.get('/:page', (_req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
});

app.use('/api/', index);

app.use('*', () => {
  throw new NotFoundError('HTTP 404 Not Found');
});

app.use(errorLogger);
// app.use(errors());
app.use(errorHandler);

// start our server
server.listen(3002, () => {
  console.log('Server started on port 3002');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
