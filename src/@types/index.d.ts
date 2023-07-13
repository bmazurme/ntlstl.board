declare module '*.css';

declare module 'interpolate-html-plugin';

type TypeValue = {
  id: number;
  name: string;
  value: number;
  column: string;
};

type TypeItem = {
  id: string,
  values: TypeValue[],
  result: number,
  item: { value: string, label: string },
};

type TypeBlockValue = { index: number, name: string, items: TypeItem[] };
type TypeBlock = Record<number, TypeBlockValue>;

type TypeMovableItem = {
  currentColumnIndex: number;
  id: string;
  index: number;
  item: { value: string, label: string };
  moveCardHandler: (
    dragIndex: number,
    hoverIndex: number,
    item: TypeItem & { currentColumnIndex: number, index: number },
  ) => void;
  result: number;
  values: TypeValue[];
};
