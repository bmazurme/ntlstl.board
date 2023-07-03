import React from 'react';
import { DndProvider } from 'react-dnd';
import { PlusIcon } from '@heroicons/react/24/outline';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { v4 as uuidv4 } from 'uuid';

import Block from './block';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Logo from './components/logo';
import UserMenu from './components/user-menu';
import Tools from './components/tools';
import Button from './components/button';
import CustomSelect from './components/custom-select';

import { useAppSelector, useAppDispatch } from './hooks';
import {
  selectBlocks, selectWorkplaces, setWorkplaces, selectWorkplace, setWorkplace,
} from './store/slices';

import style from './app.module.css';

export default function App() {
  const isMobile = window.innerWidth < 600;
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectBlocks);
  const projects = useAppSelector(selectWorkplaces);
  const project = useAppSelector(selectWorkplace);
  const addProject = () => dispatch(setWorkplaces(
    { item: { value: `project${projects.length + 1}`, label: `Project${projects.length + 1}` } }
  ))

  return (
    <div className={style.layout}>
      <div className={style.header}>
        <Logo />
        <div className={style.header_menu}>
          <CustomSelect options={projects} onChange={(pr) => dispatch(setWorkplace(pr))} value={project} />
          <Button handler={addProject} title="Add project" icon={PlusIcon} />
        </div>
        <UserMenu />
      </div>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <div className={style.container}>
          <Sidebar />
          <div className={style.app}>
            <Header />
            {Object.keys(items).sort((a, b) => a - b).map((block) => (
              <Block block={block} key={uuidv4()} />
            ))}
            <Tools />
          </div>
        </div>
      </DndProvider>
    </div>
  );
}
