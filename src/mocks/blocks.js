import { v4 as uuidv4 } from 'uuid';

import { values } from './values';

const blocks = {
  0: {
    index: 0,
    name: 'BLOCK1',
    items: [
      { id: uuidv4(), name: 'Item 1', values },
      { id: uuidv4(), name: 'Item 2', values },
      { id: uuidv4(), name: 'Item 3', values },
      { id: uuidv4(), name: 'Item 4', values },
      { id: uuidv4(), name: 'Item 5', values },
    ]
  },
  1: {
    index: 1,
    name: 'BLOCK2',
    items: []
  },
};

export { blocks };
