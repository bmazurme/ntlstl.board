import React from 'react';
import type { PropsWithChildren } from 'react';

import Header from '../header';
import Sidebar from '../sidebar';

import style from './container.module.css';

export default function Container({ header, sidebar, children }
  : PropsWithChildren & { header?: boolean; sidebar?: boolean; }) {
  return (
    <>
      {header && <Header />}
      <div className={style.container}>
        {sidebar
          && <Sidebar />}
        {children}
      </div>
    </>
  );
}
