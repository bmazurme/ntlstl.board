import React, { useCallback }  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Modal from '../../components/modal';

import { Urls } from '../../utils';

import style from './support-modal.module.css';

function SupportBody() {
  return (
    <>
      <h2>Support</h2>
    </>
  );
}

export default function SupportModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClose = useCallback(() => {
    navigate(location.state || Urls.BASE);
  }, [location.state, navigate]);

  return ( <Modal isOpen onClose={handleClose} children={<SupportBody />} />);
}
