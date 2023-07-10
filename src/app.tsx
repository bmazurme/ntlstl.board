import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import MainMenu from './components/main-menu';
import Container from './components/container';

import { useAppSelector } from './hooks';
import { selectHistory } from './store/slices';

import style from './app.module.css';

export default function App() {
  const isMobile = window.innerWidth < 600;
  const history = useAppSelector(selectHistory);

  console.log(history);

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className={style.app}>
        <MainMenu />
        <Container />
      </div>
    </DndProvider>
  );
}
