import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

import ModalOverlay from './components/modal-overlay';

import { ESC_CLOSE_ON, OVERLAY_CLOSE_ON, MODAL_CONFIG } from '../../utils';

import style from './modal.module.css';

type TypeModal = {
  title?: string;
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

export default function Modal({
  title, children, onClose, isOpen,
}: TypeModal) {
  const reactModals = document.getElementById('modals');
  const handleEscape = (e: KeyboardEvent) => {
    if (e.type === 'keydown' && e.code === 'Escape') {
      if (ESC_CLOSE_ON) {
        onClose();
      }
    }
  };

  const closeModal = () => OVERLAY_CLOSE_ON && onClose();

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  });

  return ReactDOM.createPortal(
    <AnimatePresence>
      <ModalOverlay closeModal={closeModal}>
        {isOpen && (
          <motion.div
            className={style.container}
            onClick={(e) => e.stopPropagation()}
            initial={MODAL_CONFIG.INITIAL}
            animate={MODAL_CONFIG.ANIMATE}
            exit={MODAL_CONFIG.EXIT}
          >
            {title && <h2 className="">{title}</h2>}
            <button type="button" className={style.close} data-test="close-button">
              <XMarkIcon className="h-6 w-6" onClick={onClose} />
            </button>
            <div className={style.wrapper}>
              {children}
            </div>
          </motion.div>
        )}
      </ModalOverlay>
    </AnimatePresence>,
    reactModals!,
  );
}
