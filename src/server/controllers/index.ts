import { getBooks, addBook } from './book-controller';
import {
  getUserMe, updateUser, addUser,
} from './user-controller';
import {
  getWorkplace,
  renameWorkplace,
  updateWorkplace,
  moveToArchive,
} from './workplace-controller';

export {
  getUserMe,
  getWorkplace,
  renameWorkplace,
  updateWorkplace,
  moveToArchive,
  updateUser,
  addUser,
  getBooks,
  addBook,
};
