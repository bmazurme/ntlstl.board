import { useAppSelector } from '../../hooks';
import { selectBook } from '../../store/slices';

import Values from '../values';
import { values } from '../../mocks/values';

import style from './book-form.module.css';

export default function BookForm() {
  const { name } = useAppSelector(selectBook);
  return (
    <>
      <h2>{name}</h2>
      <Values values={values} />
    </>
  );
}