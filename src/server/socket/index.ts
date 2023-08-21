import WebSocket from 'ws';
import { mock } from '../mocks/mock';

const onConnection = (ws: WebSocket) => {
  // connection is up, let's add a simple simple event
  ws.on('message', (message: string) => {
    // log the received message and send it back to the client
    console.log('received: %s', message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  ws.send(JSON.stringify(mock));
};

export default onConnection;
