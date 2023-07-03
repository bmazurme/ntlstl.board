import React from 'react';
import classNames from 'classnames';

import style from './modal-overlay.module.css';

export default function ModalOverlay({ children, closeModal }) {
  return (
    <div
      className={classNames(style.overlay)}
      onClick={closeModal}
      data-test="modal"
    >
      {children}
    </div>
  );
}
