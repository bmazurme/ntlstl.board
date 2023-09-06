import { useAppSelector } from '.';
import { selectBlocks } from '../store/slices';

export default function useBlocks() {
  return useAppSelector(selectBlocks);
}
