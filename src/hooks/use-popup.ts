import { useAppSelector } from '.';
import { selectItemPopup } from '../store/slices';

export default function usePopup() {
  return useAppSelector(selectItemPopup);
}
