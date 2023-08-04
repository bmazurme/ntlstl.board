/* eslint-disable max-len */
import React from 'react';
import { GroupBase, OptionsOrGroups, PropsValue } from 'react-select';

import Button from '../../components/button';
import CustomSelect from '../../components/custom-select';

import useFormWithValidation from '../../hooks/use-form-with-validation';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  changeInputValues,
  changeItemValue,
  selectBlocks,
  selectItems,
  setItemPopup,
  getResult,
  setHistory,
} from '../../store/slices';

import style from './item-form-layout.module.css';

export default function ItemFormLayout({ currentColumnIndex, id }: { currentColumnIndex: number, id: string }) {
  const dispatch = useAppDispatch();
  const blocks: TypeBlock = useAppSelector(selectBlocks);
  const items = useAppSelector(selectItems) as unknown as OptionsOrGroups<string, GroupBase<string>>;
  const vls: TypeValue[] = blocks[currentColumnIndex].items.find((x: TypeItem) => x.id === id)!.values;
  const { values, handleChange, resetForm } = useFormWithValidation(
    vls.reduce((a: { [x: number]: number; }, x: TypeValue, i: number) => ({ ...a, [`label${i}`]: x.value }), {}),
  );

  const changeValue = () => {
    const newValues: TypeValue[] = blocks[currentColumnIndex]
      .items.find((x: TypeItem) => x.id === id)!
      .values.map((x: TypeValue, i: number) => ({ ...x, value: Number(values[`label${i}`]) }));

    dispatch(changeInputValues({ index: currentColumnIndex, id, values: newValues }));
    dispatch(getResult({ index: currentColumnIndex, id }));

    const arr = blocks[currentColumnIndex].items
      .map((x: TypeItem) => (x.id === id
        ? {
          ...x,
          values: x.values.map((v: TypeValue, i: number) => (v.value !== Number(values[`label${i}`])
            ? { ...v, value: Number(values[`label${i}`]) }
            : v)),
        }
        : x));

    if (arr.length) {
      const obj: TypeBlock = {
        ...blocks,
        [currentColumnIndex]: { ...blocks[currentColumnIndex], items: arr },
      };
      dispatch(setHistory({ user: 'user', state: obj }));
    }

    dispatch(setItemPopup({ index: null, id: null, isOpen: false }));
  };

  return (
    <div>
      <form className={style.form}>
        <div className={style.title}>
          <CustomSelect
            options={items}
            onChange={(pr: OptionsOrGroups<string, GroupBase<string>>) => dispatch(changeItemValue({ id, item: pr, index: currentColumnIndex }))}
            value={blocks[currentColumnIndex].items.find((x: TypeItem) => x.id === id)!.item as unknown as PropsValue<string> | undefined}
          />
        </div>
        <div className={style.inputs}>
          {blocks[currentColumnIndex].items.find((x: TypeItem) => x.id === id)!.values
            .map((x: TypeValue, i: number) => (
              <div className={style.inputfield} key={x.name}>
                <span className={style.label}>{x.name}</span>
                <input
                  type="text"
                  name={`label${i}`}
                  value={values[`label${i}`]}
                  onChange={handleChange}
                  className={style.input}
                />
                <span className={style.error} />
              </div>
            ))}
        </div>
        <Button handler={changeValue} title="Save" />
      </form>
    </div>
  );
}
