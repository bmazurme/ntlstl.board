/* eslint-disable no-restricted-globals */
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import {
  UsersIcon, Squares2X2Icon, RectangleStackIcon, DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';

import WorkplaceForm from '../workplace-form';
import HistoryLayout from '../../layouts/history-layout';
import Buttons from '../buttons';
import Modal from '../modal';

import useFormWithValidation from '../../hooks/use-form-with-validation';
import { useModal } from '../../hooks/use-modal';
import { useAppSelector } from '../../hooks';
import { selectCurrentBook, selectBlocks } from '../../store/slices';
import { useRenameBookMutation } from '../../store/api';

import { downloadAsJson, Urls } from '../../utils';

import style from './workplace-header.module.css';

export default function WorkplaceHeader() {
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const [renameBook] = useRenameBookMutation();
  const blocks = useAppSelector(selectBlocks);
  const { name, id } = useAppSelector(selectCurrentBook)!;
  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    isModalOpen: isOpenHistory,
    openModal: openHistory,
    closeModal: closeHistory,
  } = useModal();
  const openPopup = () => openModal();
  const { values, handleChange, resetForm } = useFormWithValidation({ name });
  const onSave = () => downloadAsJson(blocks, `${name}.json`, 'text/plain');
  const goToUsers = () => navigate(Urls.USERS.INDEX, { state: { pathname: location.pathname } });

  const buttons = [
    { handler: onSave, component: DocumentArrowDownIcon },
    { handler: openHistory, component: RectangleStackIcon },
    { handler: goToUsers, component: UsersIcon },
    { handler: openPopup, component: Squares2X2Icon },
  ];

  const rename = async () => {
    if (values.name !== '') {
      try {
        const res = await renameBook({ name: values.name, id });
      } catch (error) {
        showBoundary(error);
      }
    } else {
      resetForm({ name });
    }
  };

  useMemo(() => {
    resetForm({ name });
  }, [name]);

  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <form className={style.header} onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        className={style.title}
        onBlur={rename}
      />
      <Buttons buttons={buttons} />
      {isModalOpen
        && (<Modal isOpen={isModalOpen} onClose={closeModal} children={<WorkplaceForm />} />)}
      {isOpenHistory
        && (<Modal isOpen={isOpenHistory} onClose={closeHistory} children={<HistoryLayout />} />)}
    </form>
  );
}
