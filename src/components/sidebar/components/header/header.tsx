import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

import IconButton from '../../../icon-button';
import CustomSelect from '../../../custom-select';

import { useAppSelector } from '../../../../hooks';
import { useAddBookMutation } from '../../../../store/api';
import { selectModules, selectCurrentUser } from '../../../../store/slices';

import style from './header.module.css';

type TypeIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  & { title?: string, titleId?: string }
  & React.RefAttributes<SVGSVGElement>>;

export default function Header({ isOpen, button }
  : { isOpen: boolean, button: { handler: () => void; component: TypeIcon } }) {
  const [typeBook, setTypeBook] = useState(null);
  const user = useAppSelector(selectCurrentUser)!;
  const [addBook] = useAddBookMutation();
  const modules = useAppSelector(selectModules);
  const addModule = {
    handler: async () => {
      addBook({
        name: 'book',
        projectId: user.projectId,
        typeBook: (typeBook as unknown as { value: string; label: string; }).value,
      });
      setTypeBook(null);
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
