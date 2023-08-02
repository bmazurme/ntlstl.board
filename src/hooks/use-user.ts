import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'store/slices';

export default function useUser() {
  return useSelector(selectCurrentUser);
}
