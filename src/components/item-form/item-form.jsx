import Button from '../button';

import useFormWithValidation from '../../hooks/use-form-with-validation';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeInputValues, selectBlocks } from '../../store/slices';

import style from './item-form.module.css';

export default function ItemForm({
  name, values: data, currentColumnIndex, id,
}) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectBlocks);
  const { values, handleChange, resetForm } = useFormWithValidation({
    label0: data[0]?.value, label1: data[1]?.value, label2: data[2]?.value, label3: data[3]?.value,
  });

  const changeValue = () => {
    const newValues = items[currentColumnIndex]
      .items.find((x) => x.id === id).values.map((x, i) => ({ ...x, value: values[`label${i}`] }));
    dispatch(changeInputValues({ index: currentColumnIndex, id, values: newValues }));
  };

  return (
    <div>
      <h2>{name}</h2>
      <form className={style.form}>
        <div className={style.inputs}>
          {data.map((x, i) => (
            <div className={style.inputfield} key={x.name}>
              <span className={style.label}>{x.name}</span>
                <input
                  type="text"
                  name={`label${i}`}
                  value={values[`label${i}`]}
                  onChange={handleChange}
                  className={style.input}
                />
              <span className={style.error}></span>
            </div>
          ))}
        </div>
        <Button handler={changeValue} title="Save" />
      </form>
    </div>
  );
}
