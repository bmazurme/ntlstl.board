import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Block from '../block';
import Modal from '../modal';
import ItemFormLayout from '../../layouts/item-form-layout';

import { useBlocks, useAppDispatch, usePopup } from '../../hooks';
import { setItemPopup } from '../../store/slices';

export default function Blocks() {
  const dispatch = useAppDispatch();
  const blocks = useBlocks();
  const { id, index, isOpen } = usePopup();
  const closeModal = () => dispatch(setItemPopup({ index: null, id: null, isOpen: false }));
  const array = Object.keys(blocks).map((x) => Number(x)).sort((a, b) => a - b);

  return (
    <>
      {array.map((block: number) => (<Block block={block} key={uuidv4()} />))}
      {isOpen
        && (
          <Modal
            onClose={closeModal}
            children={(
              <ItemFormLayout
                currentColumnIndex={index!}
                id={id!}
              />
            )}
          />
        )}
    </>
  );
}
