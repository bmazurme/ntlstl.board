declare module '*.css';

declare module 'interpolate-html-plugin';

type TypeUser = {
  name: string;
  email: string;
  active: boolean;
  paid: string;
  project: { value: string; label: string; } | null;
};

type TypeNotification = {
  id: number;
  title: string;
  notification: string;
  read: boolean;
};

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
type TypeBook = { name: string; id: string; projectId: string; typeBook: string; };

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

type TypeItemData = {
  itemData: {
    index: number,
    id: string,
    currentColumnIndex: number,
    childRef: unknown,
    opacity: number,
  },
};
