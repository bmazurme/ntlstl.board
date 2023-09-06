import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useErrorBoundary } from 'react-error-boundary';

import IconButton from '../../../icon-button';
import CustomSelect from '../../../custom-select';

import { useAddBookMutation } from '../../../../store/api';
import { selectModules } from '../../../../store/slices';
import { useUser, useAppSelector } from '../../../../hooks';

import style from './header.module.css';

type TypeIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  & { title?: string, titleId?: string }
  & React.RefAttributes<SVGSVGElement>>;

export default function Header({ isOpen, button }
  : { isOpen: boolean, button: { handler: () => void; component: TypeIcon } }) {
  const user = useUser()!;
  const [typeBook, setTypeBook] = useState(null);
  const { showBoundary } = useErrorBoundary();
  const [addBook] = useAddBookMutation();
  const modules = useAppSelector(selectModules);
  const addModule = {
    handler: async () => {
      try {
        await addBook({
          name: 'book',
          projectId: user.projectId,
          typeBook: (typeBook as unknown as { value: string; label: string; }).value,
        });
        setTypeBook(null);
      } catch (error) {
        showBoundary(error);
      }
    },
    component: PlusIcon,
  };

  return (
    <div className={style.sidebar_header}>
      {isOpen
        && (
          <div className={style.buttons}>
            <CustomSelect
              options={modules}
              value={typeBook}
              onChange={(pr) => setTypeBook(pr)}
            />
            <IconButton {...addModule} disabled={!typeBook} />
          </div>
        )}
      <IconButton {...button} />
    </div>
  );
}
