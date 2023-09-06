import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

import useBlocks from './use-blocks';
import useBook from './use-book';
import useBooks from './use-books';
import useHistory from './use-history';
import useUser from './use-user';
import usePopup from './use-popup';
import { useModal } from './use-modal';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
  useBlocks,
  useBook,
  useBooks,
  useHistory,
  useUser,
  useModal,
  usePopup,
};
