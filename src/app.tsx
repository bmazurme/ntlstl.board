import React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/main-page';
import NotFoundPage from './pages/not-found-page';

import ErrorBoundaryWrapper from '../src/components/error-boundary';

import { useAppSelector } from './hooks';
import { selectHistory } from './store/slices';
import useWindowDimensions, { getVisualProps } from './hooks/use-window-dimensions';

import { Urls } from './utils';

export default function App() {
  const { blocks } = getVisualProps(useWindowDimensions());
  const isMobile = blocks === 1;

  const history = useAppSelector(selectHistory);
  console.log(history);

  return (
    <ErrorBoundaryWrapper>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Routes>
          <Route index element={(<MainPage />)} />
          <Route path={Urls[404]} element={(<NotFoundPage />)} />
        </Routes>
      </DndProvider>
    </ErrorBoundaryWrapper>
  );
}
