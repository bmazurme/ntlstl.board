import WebSocket from 'ws';
import { mock } from '../mocks/mock';

// import Items from './models/item-model';

// const collection = db.collection('Books');
// const changeStream = Fields.watch();
// changeStream.on('change', event => {
//   // event — см. типы событий: https://docs.mongodb.com/manual/reference/change-events/
// });

const onConnection = (ws: WebSocket) => {
  // connection is up, let's add a simple simple event
  ws.on('message', (message: string) => {
    // log the received message and send it back to the client
    console.log('received: %s', message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  // const itemsStream = Items.watch();
  // itemsStream.on('delete', (event) => {
  // // event — см. типы событий: https://docs.mongodb.com/manual/reference/change-events/
  //   console.log(event);
  // });

  ws.send(JSON.stringify(mock));
};

export default onConnection;
