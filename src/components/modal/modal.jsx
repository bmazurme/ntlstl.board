import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

import ModalOverlay from '../modal-overlay';

import { ESC_CLOSE_ON, OVERLAY_CLOSE_ON, MODAL_CONFIG } from '../../utils';

import style from './modal.module.css';

export default function Modal({
  title, children, onClose, isOpen,
}) {
  const reactModals = document.getElementById('modals');
  const handleEscape = (e) => {
    if (e.type === 'keydown' && e.code === 'Escape') {
      if (OVERLAY_CLOSE_ON) {
        onClose();
      }
    }
  };

  const closeModal = () => ESC_CLOSE_ON && onClose();

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
              <XMarkIcon className="h-6 w-6 text-blue-500" onClick={onClose} />
            </button>
            {children}
          </motion.div>
        )}
      </ModalOverlay>
    </AnimatePresence>,
    reactModals,
);
}
