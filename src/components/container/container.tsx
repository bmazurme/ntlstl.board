import React from 'react';
import type { PropsWithChildren } from 'react';

import Header from '../header';
import Sidebar from '../sidebar';

import style from './container.module.css';

type TypeContainerProps = PropsWithChildren & { header?: boolean; sidebar?: boolean; }

export default function Container({ header, sidebar, children }: TypeContainerProps) {
  return (
    <>
      {header && <Header />}
      <div className={style.container}>
        {sidebar && <Sidebar />}
        {children}
      </div>
    </>
  );
}
