import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';

import Button from '../button/button';

import { useSignOutMutation } from '../../store/api';
import { useUser } from '../../hooks';

import { Urls } from '../../utils';

// import style from './profile.module.css';

export default function Profile() {
  const user = useUser();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const [signOut] = useSignOutMutation();
  const onLogOut = async () => {
    try {
      await signOut();
      navigate(Urls.SIGN.IN);
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <>
      <h2>Profile</h2>
      <h3>{user?.defaultEmail}</h3>
      <Button title="Logout" handler={onLogOut} />
    </>
  );
}
