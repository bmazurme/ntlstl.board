/* eslint-disable react/button-has-type */
import React from 'react';
import classNames from 'classnames';

import style from './button.module.css';

type TypeIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  & { title?: string, titleId?: string }
  & React.RefAttributes<SVGSVGElement>>;

type TypeButton = {
  icon?: TypeIcon;
  handler?: () => void;
  title: string;
  type?: 'button' | 'submit',
  extraClass?: string;
};

export default function Button({
  icon: Icon, handler, title, type, extraClass,
}: TypeButton) {
  return (
    <button
      type={type ?? 'button'}
      className={classNames(style.button, { [`${extraClass}`]: extraClass })}
      onClick={handler}
    >
      {Icon
        && (
          <div className={style.box}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      <span className={style.title}>{title}</span>
    </button>
  );
}
