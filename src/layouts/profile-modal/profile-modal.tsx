import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Modal from '../../components/modal';

import { useGetUserMeQuery } from '../../store/api';

import { Urls } from '../../utils';

import style from './profile-modal.module.css';

function ProfileBody() {
  const { data } = useGetUserMeQuery() as unknown as { data: TypeUser };
  console.log(data);

  return (
    <>
      <h2>Profile</h2>
      <ul>
        <li>{data?.name}</li>
        <li>{data?.email}</li>
        <li>{data?.paid}</li>
        <li>{data?.active.toString()}</li>
      </ul>
    </>
  );
}

export default function ProfileModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClose = useCallback(() => {
    navigate(location.state || Urls.BASE);
  }, [location.state, navigate]);

  return (<Modal isOpen onClose={handleClose} children={<ProfileBody />} />);
}
