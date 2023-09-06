import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GroupBase, OptionsOrGroups, PropsValue } from 'react-select';
import { useErrorBoundary } from 'react-error-boundary';
import { PlusIcon } from '@heroicons/react/24/outline';

import Button from '../button';
import CustomSelect from '../custom-select';
import MobileMenu from './components/mobile-menu';

import { useUser } from '../../hooks';
import useWindowDimensions, { getVisualProps } from '../../hooks/use-window-dimensions';
import { useGetProjectsQuery, useAddProjectMutation, useUpdateUserMutation } from '../../store/api';

import style from './header-menu.module.css';

export default function HeaderMenu() {
  const user = useUser();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const { data: options = [] } = useGetProjectsQuery();
  const [addProject] = useAddProjectMutation();
  const [updateUser] = useUpdateUserMutation();
  const { blocks } = getVisualProps(useWindowDimensions());

  const isMobile = blocks === 1;
  const projectId = user?.projectId;
  const value: any = options.find((x) => x.value === projectId);

  const onChange = async (project: any) => {
    try {
      await updateUser({ ...user, projectId: project.value });
      navigate('/projects');
    } catch (error) {
      showBoundary(error);
    }
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
