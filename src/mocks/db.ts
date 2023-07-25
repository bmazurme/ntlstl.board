type TWorkPlace = {
  id: string;
  name: string;
  ownerId: string;
  users: string[];
  blocks: TBlock[];
};

type TBlock = {
  id: string;
  workplaceId: string;
  index: number;
  name: string;
  items: TItem[];
};

type TItem = {
  id: string;
  index: number;
  values: TValue[];
};

type TValue = {
  name: string;
  value: number;
  color: string;
};
