import React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/main-page';
import NotFoundPage from './pages/not-found-page';

import { useAppSelector } from './hooks';
import { selectHistory } from './store/slices';

import { Urls } from './utils';

export default function App() {
  const isMobile = window.innerWidth < 600;

  const history = useAppSelector(selectHistory);
  console.log(history);

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <Routes>
        <Route index element={(<MainPage />)} />
        <Route path={Urls[404]} element={(<NotFoundPage />)} />
      </Routes>
    </DndProvider>
  );
}
