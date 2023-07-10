import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import IconButton from '../icon-button';

import style from './buttons.module.css';

type TypeIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  & { title?: string, titleId?: string }
  & React.RefAttributes<SVGSVGElement>>;

export default function Buttons({ buttons }
  : { buttons: { component: TypeIcon, handler: () => void }[] }) {
  return (
    <div className={style.buttons}>
      {buttons.map((button) => (<IconButton key={uuidv4()} {...button} />))}
    </div>
  );
}
