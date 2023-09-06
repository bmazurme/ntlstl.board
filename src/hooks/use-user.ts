import { useAppSelector } from '.';
import { selectCurrentUser } from '../store/slices';

export default function useUser() {
  return useAppSelector(selectCurrentUser);
}
