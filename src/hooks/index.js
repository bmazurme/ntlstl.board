import { useDispatch, useSelector } from 'react-redux';
// import type { RootState, AppDispatch } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// type DispatchFunc = () => AppDispatch;
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;