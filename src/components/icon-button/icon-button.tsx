import React from 'react';

import style from './icon-button.module.css';

type TypeIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  & { title?: string, titleId?: string }
  & React.RefAttributes<SVGSVGElement>>;

export default function IconButton({ handler, component: Component, disabled }
  : { handler: () => void, component: TypeIcon, disabled?: boolean }) {
  return (
    <button
      type="button"
      className={style.button}
      onClick={handler}
      disabled={disabled}
    >
      <Component className="h-6 w-6" />
    </button>
  );
}
