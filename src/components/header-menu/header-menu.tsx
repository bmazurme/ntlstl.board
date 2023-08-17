import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GroupBase, OptionsOrGroups, PropsValue } from 'react-select';
import { PlusIcon } from '@heroicons/react/24/outline';

import Button from '../button';
import CustomSelect from '../custom-select';
import MobileMenu from './components/mobile-menu';

import useWindowDimensions, { getVisualProps } from '../../hooks/use-window-dimensions';
import { useAppSelector } from '../../hooks';
import { selectCurrentUser } from '../../store/slices';
import {
  useGetProjectsQuery, useAddProjectMutation, useUpdateUserMutation,
} from '../../store/api';

import style from './header-menu.module.css';

export default function HeaderMenu() {
  const navigate = useNavigate();
  const { data: options = [] } = useGetProjectsQuery();
  const user = useAppSelector(selectCurrentUser);
  const [addProject] = useAddProjectMutation();
  const [updateUser] = useUpdateUserMutation();
  const { blocks } = getVisualProps(useWindowDimensions());

  const isMobile = blocks === 1;
  // @ts-ignore
  const projectId = user?.projectId;
  const value: any = options.find((x) => x.value === projectId);

  const onChange = async (project: any) => {
    updateUser({ ...user, projectId: project.value });
    navigate('/projects');
  };

  return (
    isMobile
      ? <MobileMenu />
      : (
        <div className={style.header_menu}>
          <CustomSelect
            options={options as unknown as OptionsOrGroups<string, GroupBase<string>>}
            value={value}
            onChange={onChange}
          />
          <Button handler={addProject} title="Add project" icon={PlusIcon} />
        </div>
      )
  );
}
