import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import IconButton from '../../icon-button';
import Modal from '../../modal';

import { useModal } from '../../../hooks';

export default function MobileMenu() {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <IconButton component={ChevronDownIcon} handler={openModal} />
      {isModalOpen && (<Modal onClose={closeModal} children={<div>menu</div>} />)}
    </>
  );
}
