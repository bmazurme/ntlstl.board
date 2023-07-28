import React, { useCallback }  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Modal from '../../components/modal';

import { Urls } from '../../utils';

import style from './profile-modal.module.css';

function UsersBody() {
  return (
    <>
      <h2>Users</h2>
    </>
  );
}

export default function UsersModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClose = useCallback(() => {
    navigate(location.state || Urls.BASE);
  }, [location.state, navigate]);

  return ( <Modal isOpen onClose={handleClose} children={<UsersBody />} />);
}
