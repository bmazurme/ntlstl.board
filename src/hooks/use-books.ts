import { useAppSelector } from '.';
import { selectBooks } from '../store/slices';

export default function useBooks() {
  return useAppSelector(selectBooks);
}
