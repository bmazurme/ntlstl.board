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
    projectId: '0',
  },
];

type TypeProject = { userId: string; items: { value: string; label: string; }[]; };
const projects: TypeProject[] = [{ userId: '0', items: [{ value: '0', label: 'Project 1' }] }];

export {
  mock, users, projects,
};
