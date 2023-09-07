import React from 'react';

import style from './welcome-block.module.css';

export default function WelcomeBlock() {
  return (
    <section className={style.layout}>
      <div className={style.container}>
        <h2 className={style.title}>Welcome!</h2>
      </div>
    </section>
  );
}
