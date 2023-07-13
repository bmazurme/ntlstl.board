import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import IconButton from '../icon-button';

import style from './buttons.module.css';
import classNames from "classnames";

type TypeIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  & { title?: string, titleId?: string }
  & React.RefAttributes<SVGSVGElement>>;

export default function Buttons({ buttons, extraClass }
  : { buttons: { component: TypeIcon, handler: () => void }[], extraClass?: object }) {
  return (
    <div className={classNames(style.buttons, extraClass)}>
      {buttons.map((button) => (<IconButton key={uuidv4()} {...button} />))}
    </div>
  );
}
