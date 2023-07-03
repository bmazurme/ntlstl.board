import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

import ItemForm from '../item-form';
import Buttons from '../buttons';
import Modal from '../modal';

import { useModal } from '../../hooks/use-modal';
import { useAppDispatch } from '../../hooks';
import { removeItem } from '../../store/slices';

import style from './item.module.css';

export default function Item({ itemData }) {
  const {
    name, index, id, currentColumnIndex, childRef, opacity, values,
  } = itemData;
  const dispatch = useAppDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();
  const openPopup = () => openModal();
  const deleteItem = () => dispatch(removeItem({ block: currentColumnIndex, id }))

  const buttons = [
    { handler: openPopup, component: PencilIcon },
    { handler: deleteItem, component: TrashIcon },
  ];

  return (
    <>
      <div ref={childRef} className={style.item} style={{ opacity }}>
        <div className={style.data}>
          <span className={style.position}>{index + 1}</span>
          <span className={style.title}>{name}</span>
          {values.map((value) => (<span key={uuidv4()} className={style.value}>{value.name} - {value.value}</span>))}
        </div>
        <Buttons buttons={buttons} />
      </div>
      {isModalOpen
        && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            children={<ItemForm name={name} values={values} currentColumnIndex={currentColumnIndex} id={id} />}
          />
        )}
    </>
  );
}
