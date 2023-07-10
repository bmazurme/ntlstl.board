/* eslint-disable max-len */
import React from 'react';
import { GroupBase, OptionsOrGroups, PropsValue } from 'react-select';
import { PlusIcon } from '@heroicons/react/24/outline';

import Logo from '../logo';
import UserMenu from '../user-menu';
import Button from '../button';
import CustomSelect from '../custom-select';

import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  selectWorkplaces, setWorkplaces, selectWorkplace, setWorkplace,
} from '../../store/slices';

import style from './main-menu.module.css';

export default function MainMenu() {
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectWorkplace) as unknown as PropsValue<string>;
  const projects = useAppSelector(selectWorkplaces) as unknown as OptionsOrGroups<string, GroupBase<string>>;
  const addProject = () => dispatch(setWorkplaces(
{
      value: `project${projects.length + 1}`,
      label: `Project${projects.length + 1}`,
    },
  ));

  return (
    <div className={style.header}>
      <Logo />
      <div className={style.header_menu}>
        <CustomSelect
          options={projects}
          value={project}
          onChange={(pr: { value: string, label: string }) => dispatch(setWorkplace(pr))}
        />
        <Button handler={addProject} title="Add project" icon={PlusIcon} />
      </div>
      <UserMenu />
    </div>
  );
}
