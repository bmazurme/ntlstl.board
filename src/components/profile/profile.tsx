import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';

import Button from '../button';

import { useGetUserMeQuery, useSignOutMutation } from '../../store/api';

import { Urls } from '../../utils';

import style from './profile.module.css';

export default function Profile() {
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const { data } = useGetUserMeQuery() as unknown as { data: TypeUser };
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
      <h3>{data?.defaultEmail}</h3>
      <Button title="Logout" handler={onLogOut} />
    </>
  );
}
