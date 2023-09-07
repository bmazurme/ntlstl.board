import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Users from '../../components/users/users';
import Modal from '../../components/modal/modal';

import { Urls } from '../../utils';

// import style from './users-modal-layout.module.css';

export default function UsersModalLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClose = useCallback(() => {
    navigate(location.state || Urls.BASE.INDEX);
  }, [location.state, navigate]);

  return (<Modal onClose={handleClose} children={<Users />} />);
}
