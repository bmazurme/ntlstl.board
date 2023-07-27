/* eslint-disable max-len */
import React from 'react';
import { GroupBase, OptionsOrGroups, PropsValue } from 'react-select';
import { PlusIcon } from '@heroicons/react/24/outline';

import Button from '../button';
import CustomSelect from '../custom-select';
import MobileMenu from './components/mobile-menu';

import { useAppSelector, useAppDispatch } from '../../hooks';
import useWindowDimensions, { getVisualProps } from '../../hooks/use-window-dimensions';
import {
  selectWorkplaces, setWorkplaces, selectWorkplace, setWorkplace,
} from '../../store/slices';

import style from './header-menu.module.css';

export default function HeaderMenu() {
  const { blocks } = getVisualProps(useWindowDimensions());
  const isMobile = blocks === 1;

  const dispatch = useAppDispatch();
  const workplace = useAppSelector(selectWorkplace) as unknown as PropsValue<string>;
  const workplaces = useAppSelector(selectWorkplaces) as unknown as OptionsOrGroups<string, GroupBase<string>>;

  const addProject = () => dispatch(setWorkplaces(
    {
      value: `Workplace${workplaces.length + 1}`,
      label: `Workplace${workplaces.length + 1}`,
    },
  ));

  return (
    isMobile
      ? <MobileMenu />
      : (
        <div className={style.header_menu}>
          <CustomSelect
            options={workplaces}
            value={workplace}
            onChange={(pr) => dispatch(setWorkplace(pr))}
          />
          <Button handler={addProject} title="Add project" icon={PlusIcon} />
        </div>
      )
  );
}
