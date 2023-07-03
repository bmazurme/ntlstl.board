import React from 'react';
import {
  Squares2X2Icon, RectangleStackIcon, UsersIcon, DocumentArrowDownIcon,
} from '@heroicons/react/24/outline'

import BookForm from '../book-form';
import Buttons from '../buttons';
import Modal from '../modal';

import { useModal } from '../../hooks/use-modal';
import useFormWithValidation from '../../hooks/use-form-with-validation';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectBook, setBookName } from '../../store/slices';

import style from './header.module.css';

export default function Header() {
  const dispatch = useAppDispatch();
  const { name } = useAppSelector(selectBook);
  const { isModalOpen, openModal, closeModal } = useModal();
  const openPopup = () => openModal();
  const { values, handleChange, resetForm } = useFormWithValidation({ name });
  const buttons = [
    { handler: () => console.log('s'), component: DocumentArrowDownIcon },
    { handler: () => console.log('h'), component: RectangleStackIcon },
    { handler: () => console.log('u'), component: UsersIcon },
    { handler: openPopup, component: Squares2X2Icon },
  ];
  const renameBook = () => {
    if (values.name !== '') {
      dispatch(setBookName({ name: values.name }))
    } else {
      resetForm({ name })
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
      <Buttons buttons={buttons}/>
      {isModalOpen
        && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            children={<BookForm />}
          />
        )}
    </form>
  );
}
