import React from 'react';
import {
  UsersIcon,
  Squares2X2Icon,
  RectangleStackIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';

import WorkplaceForm from '../workplace-form';
import History from '../../layouts/history';
import Buttons from '../buttons';
import Modal from '../modal';

import { useModal } from '../../hooks/use-modal';
import useFormWithValidation from '../../hooks/use-form-with-validation';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectBook, setBookName, selectBlocks } from '../../store/slices';

import style from './workplace-header.module.css';

export default function WorkplaceHeader() {
  const dispatch = useAppDispatch();
  const { name } = useAppSelector(selectBook);
  const blocks = useAppSelector(selectBlocks);
  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    isModalOpen: isOpenHistory,
    openModal: openHistory,
    closeModal: closeHistory,
  } = useModal();
  const openPopup = () => openModal();
  const { values, handleChange, resetForm } = useFormWithValidation({ name });
  const buttons = [
    { handler: () => console.log(blocks), component: DocumentArrowDownIcon },
    { handler: openHistory, component: RectangleStackIcon },
    { handler: () => console.log('u'), component: UsersIcon },
    { handler: openPopup, component: Squares2X2Icon },
  ];
  const renameBook = () => {
    if (values.name !== '') {
      dispatch(setBookName(values.name));
    } else {
      resetForm({ name });
    }
  };

  return (
    <form className={style.header}>
      <input
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        className={style.title}
        onBlur={renameBook}
      />
      <Buttons buttons={buttons} />
      {isModalOpen
        && (<Modal isOpen={isModalOpen} onClose={closeModal} children={<WorkplaceForm />} />)}
      {isOpenHistory
        && (<Modal isOpen={isOpenHistory} onClose={closeHistory} children={<History />} />)}
    </form>
  );
}
