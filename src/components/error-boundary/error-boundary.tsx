/* eslint-disable react/button-has-type */
import React from 'react';
import type { PropsWithChildren } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import style from './error-boundary.module.css';

type ErrorBoundaryWrapperProps = PropsWithChildren<unknown>;

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();
  const onReset = () => {
    resetErrorBoundary();
    navigate('/');
  };

  return (
    <div className={style.boundary}>
      <h2 className={style.title}>APP-ERROR</h2>
      <p className={style.message}>{error?.message}</p>
      <div className={style.block}>
        Try to
        <button className={style.button} onClick={resetErrorBoundary}>
          Reload app
        </button>
        or
        <button className={style.link} onClick={onReset}>
          Go to homepage
        </button>
      </div>
    </div>
  );
}

export default function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={(details) => {
        // Reset the state of your app so the error doesn't happen again
        console.log(details);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
