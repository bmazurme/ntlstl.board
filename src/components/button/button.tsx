import React from 'react';

import style from './button.module.css';

type TypeIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  & { title?: string, titleId?: string }
  & React.RefAttributes<SVGSVGElement>>;

export default function Button({ icon: Icon, handler, title }
  : { icon?: TypeIcon, handler: () => void, title: string }) {
  return (
    <button type="button" className={style.button} onClick={handler}>
      {Icon
        && (
        <div className={style.box}>
          <Icon className="h-6 w-6 text-blue-500" />
        </div>
        )}
      <span>{title}</span>
    </button>
  );
}
