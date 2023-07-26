import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import MainPage from './pages/main-page';
import NotFoundPage from './pages/not-found-page';

import { useAppSelector } from './hooks';
import { selectHistory } from './store/slices';

import useWindowDimensions, { getVisualProps } from './hooks/use-window-dimensions';
import useDarkTheme from './hooks/use-dark-theme';

import ThemeContext from './context/theme-context';

import { Urls } from './utils';

export default function App() {
  const { providerValue } = useDarkTheme();
  const { blocks } = getVisualProps(useWindowDimensions());
  const history = useAppSelector(selectHistory);
  const isMobile = blocks === 1;

  console.log(history);

  return (
    <ThemeContext.Provider value={providerValue}>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Routes>
          <Route index element={(<MainPage />)} />
          <Route path={Urls[404]} element={(<NotFoundPage />)} />
        </Routes>
      </DndProvider>
    </ThemeContext.Provider>
  );
}
