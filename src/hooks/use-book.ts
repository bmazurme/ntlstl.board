import { useAppSelector } from '.';
import { selectCurrentBook } from '../store/slices';

export default function useBook() {
  return useAppSelector(selectCurrentBook);
}
