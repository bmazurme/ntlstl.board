import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Block from '../block';
import ItemForm from '../../layouts/item-form';
import Modal from '../modal';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectBlocks, selectItemPopup, setItemPopup } from '../../store/slices';

export default function Blocks() {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector(selectBlocks);
  const { id, index, isOpen } = useAppSelector(selectItemPopup);
  const closeModal = () => dispatch(setItemPopup({ index: null, id: null, isOpen: false }));

  return (
    <>
      {Object.keys(blocks)
        .map((x) => Number(x))
        .sort((a, b) => a - b)
        .map((block: number) => (<Block block={block} key={uuidv4()} />))}
      {isOpen
        && (
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            children={<ItemForm currentColumnIndex={index!} id={id!} />}
          />
        )}
    </>
  );
}
