import React from 'react';
import classNames from 'classnames';

import style from './icon-button.module.css';

type TypeIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  & { title?: string; titleId?: string; }
  & React.RefAttributes<SVGSVGElement>>;
type TypeIconButtonProps = { handler: () => void; component: TypeIcon; disabled?: boolean; };

export default function IconButton({
  handler, component: Component, disabled,
}: TypeIconButtonProps) {
  return (
    <button
      type="button"
      className={classNames(style.button, { [style.disabled]: disabled })}
      onClick={handler}
      disabled={disabled}
    >
      <Component className="h-6 w-6" />
    </button>
  );
}
