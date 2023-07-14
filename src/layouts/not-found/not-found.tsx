import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { Urls } from '../../utils';

import style from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={style.container}>
      <h2 className={classNames(style.title)}>
        404
        <span className={classNames(style.span)}>
          Not found page
        </span>
      </h2>
      <NavLink className="" to={Urls.BASE}>
        Go to main page
      </NavLink>
    </div>
  );
}
