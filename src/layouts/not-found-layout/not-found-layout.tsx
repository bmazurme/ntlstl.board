import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { Urls } from '../../utils';

import style from './not-found-layout.module.css';

export default function NotFoundLayout() {
  return (
    <div className={style.container}>
      <h2 className={classNames(style.title)}>
        404
        <span className={classNames(style.span)}>
          Not found page
        </span>
      </h2>
      <NavLink className={style.link} to={Urls.BASE.INDEX}>
        Go to main page
      </NavLink>
    </div>
  );
}
