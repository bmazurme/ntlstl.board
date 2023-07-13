import { v4 as uuidv4 } from 'uuid';

import { values } from './values';

// export type TypeValue = {
//   id: number;
//   name: string;
//   value: number;
//   column: string;
// };
//
// export type TypeItem = {
//   id: string,
//   values: TypeValue[],
//   result: number,
//   item: { value: string, label: string },
// };
//
// export type TypeBlockValue = { index: number, name: string, items: TypeItem[] };
// export type TypeBlock = Record<number, TypeBlockValue>;

const blocks: TypeBlock = {
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
};

export { blocks };
