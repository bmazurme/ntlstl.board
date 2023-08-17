import { getBooks, addBook } from './books-controller';
import { getUserMe, updateUser } from './user-controller';
import {
  getWorkplace, renameWorkplace, updateWorkplace, moveToArchive,
} from './workplace-controller';

export {
  getUserMe,
  getWorkplace,
  renameWorkplace,
  updateWorkplace,
  moveToArchive,
  updateUser,
  getBooks,
  addBook,
};
