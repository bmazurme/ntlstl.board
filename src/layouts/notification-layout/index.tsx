import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

import { useAppSelector } from '../../hooks';
import { selectNotification } from '../../store/slices';

import style from './notification-layout.module.css';

export default function NotificationLayout() {
  const data = useAppSelector(selectNotification);
  console.log(data);

  return (
    <>
      <h2>Notification</h2>
      {data.map((item) => (
        <div key={uuidv4()}>
          <div className={style.icon}>
            <InformationCircleIcon className="h-6 w-6" />
          </div>
          <div className={style.icon}>
            <CheckCircleIcon className="h-6 w-6" />
          </div>
          <h3>{item.title}</h3>
          <p>{item.notification}</p>
        </div>
      ))}
    </>
  );
}
