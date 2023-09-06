import { useAppSelector } from '.';
import { selectHistory } from '../store/slices';

export default function useHistory() {
  return useAppSelector(selectHistory);
}
