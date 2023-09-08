import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Support from '../../components/support';
import Modal from '../../components/modal';

import { Urls } from '../../utils';

// import style from './support-modal-layout.module.css';

export default function SupportModalLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClose = useCallback(() => {
    navigate(location.state || Urls.BASE.INDEX);
  }, [location.state, navigate]);

  return (<Modal onClose={handleClose} children={<Support />} />);
}
