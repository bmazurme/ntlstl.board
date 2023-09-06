import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Modal from '../../components/modal';
import Profile from '../../components/profile';

import { Urls } from '../../utils';

// import style from './profile-modal-layout.module.css';

export default function ProfileModalLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClose = useCallback(() => {
    navigate(location.state || Urls.BASE.INDEX);
  }, [location.state, navigate]);

  return (<Modal onClose={handleClose} children={<Profile />} />);
}
