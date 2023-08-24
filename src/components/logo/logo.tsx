import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RectangleGroupIcon } from '@heroicons/react/24/outline';

import IconButton from '../icon-button';

import style from './logo.module.css';

export default function Logo() {
  const navigate = useNavigate();
  const btn = { handler: () => navigate('/'), component: RectangleGroupIcon };

  return (
    <div className={style.logo}>
      <IconButton {...btn} />
    </div>
  );
}
