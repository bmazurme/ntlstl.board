import { v4 as uuidv4 } from 'uuid';

import { values } from '../../mocks/values';

const blocks: { id: string; value: TypeBlock }[] = [
  {
    id: '0',
    value: {
      0: {
        index: 0,
        name: 'BLOCK1',
        items: [
          {
            id: uuidv4(), item: { value: '0', label: 'Item 1' }, values, result: 0,
          },
          {
            id: uuidv4(), item: { value: '1', label: 'Item 2' }, values, result: 0,
          },
          {
            id: uuidv4(), item: { value: '2', label: 'Item 3' }, values, result: 0,
          },
          {
            id: uuidv4(), item: { value: '3', label: 'Item 4' }, values, result: 0,
          },
          {
            id: uuidv4(), item: { value: '4', label: 'Item 5' }, values, result: 0,
          },
        ],
      },
      1: {
        index: 1,
        name: 'BLOCK2',
        items: [],
      },
    },
  },
];

const mock = [{
  id: 0,
  title: 'title',
  notification: 'text',
  read: false,
}];

const users: TypeUser[] = [
  {
    defaultEmail: 'str-22@yandex.ru',
    paid: '01.01.2024',
    project: { value: '0', label: 'Project 1' },
  },
];

export { blocks, mock, users };
