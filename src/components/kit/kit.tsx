import React, { useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';

import CustomSelect from '../custom-select';
import InputField from '../input-field';
import Field from '../field';

import style from './kit.module.css';

function FormField({ type }: { type: 'input' | 'select' | 'boolean'}) {
  const component = type === 'input'
    ? <InputField type="text" name="field" errors={{}} value="field" onChange={() => console.log(1)} />
    : <CustomSelect name="field" options={[]} value="" onChange={() => console.log(2)} />;

  return (component);
}

export default function Kit() {
  const [value, setValue] = useState<any>({ value: 'input', label: 'input' });
  const options: any = [
    { value: 'input', label: 'input' },
    { value: 'select', label: 'select' },
    { value: 'boolean', label: 'boolean' },
  ];

  const data = {
    label: 'Qmid',
    value: '15.0',
  };

  return (
    <div className={style.kit}>
      <CustomSelect
        options={options}
        onChange={(pr: OptionsOrGroups<string, GroupBase<string>>) => setValue(pr)}
        value={value!}
      />
      <h6>{value.label}</h6>
      <FormField type={value.value} />
      <Field {...data} />
      <Field {...data} type="blue" />
      <Field {...data} type="red" />
      <Field {...data} type="green" />
      <Field label="name" type="green" />
    </div>
  );
}
