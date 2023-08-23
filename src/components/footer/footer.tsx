import React from 'react';
import { Link } from 'react-router-dom';

import style from './footer.module.css';

export default function Footer({ links }: { links: Record<string, string>[] }) {
  return (
    <ul className={style.footer}>
      {links.map((link) => (
        <li className={style.item} key={link.id}>
          <Link to={link.to} className={style.link}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}
