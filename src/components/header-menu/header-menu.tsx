import React from 'react';
import { GroupBase, OptionsOrGroups, PropsValue } from 'react-select';
import { PlusIcon } from '@heroicons/react/24/outline';

import Button from '../button';
import CustomSelect from '../custom-select';
import MobileMenu from './components/mobile-menu';

import useWindowDimensions, { getVisualProps } from '../../hooks/use-window-dimensions';
import {
  useGetProjectsQuery, useAddProjectMutation, useGetUserMeQuery, useUpdateUserMutation,
} from '../../store/api';

import style from './header-menu.module.css';

export default function HeaderMenu() {
  const { data: options = [] } = useGetProjectsQuery();
  const { data: user } = useGetUserMeQuery();
  const [addProject] = useAddProjectMutation();
  const [updateUser] = useUpdateUserMutation();
  const { blocks } = getVisualProps(useWindowDimensions());

  const isMobile = blocks === 1;
  const value = user?.project as PropsValue<string>;

  return (
    isMobile
      ? <MobileMenu />
      : (
        <div className={style.header_menu}>
          <CustomSelect
            options={options as unknown as OptionsOrGroups<string, GroupBase<string>>}
            value={value}
            onChange={async (pr) => updateUser({ ...user, project: pr })}
          />
          <Button handler={addProject} title="Add project" icon={PlusIcon} />
        </div>
      )
  );
}
