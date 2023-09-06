import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import MainPage from './pages/main-page';
import ChartPage from './pages/chart-page';
import KitPage from './pages/kit-page';
import SupportPage from './pages/support-page';
import ProfileModalPage from './pages/profile-modal-page';
import SignInPage from './pages/signin-page';
import OauthPage from './pages/oauth-page';
import OauthGithubPage from './pages/oauth-github-page';
import SupportModalPage from './pages/support-modal-page';
import UsersModalPage from './pages/users-modal-page';
import NotFoundPage from './pages/not-found-page';
import Board from './pages/board-page';

import useHistory from './hooks/use-history';
import ThemeContext from './context/theme-context';

import useWindowDimensions, { getVisualProps } from './hooks/use-window-dimensions';
import useDarkTheme from './hooks/use-dark-theme';

import { Urls } from './utils';

export default function App() {
  const { providerValue } = useDarkTheme();
  const { blocks } = getVisualProps(useWindowDimensions());
  const history = useHistory();
  const isMobile = blocks === 1;
  const location = useLocation();

  useEffect(() => {
    location.state = null;
  }, []);
  console.log(history);

  return (
    <ThemeContext.Provider value={providerValue}>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Routes location={location.state?.pathname || location}>
          <Route path={Urls.BASE.INDEX} element={(<MainPage />)}>
            <Route path={Urls.BASE.PROJECT} element={(<Board />)} />
          </Route>

          <Route path={Urls.SUPPORT.INDEX} element={(<SupportPage />)} />
          <Route path={Urls.CHART.INDEX} element={(<ChartPage />)} />
          <Route path={Urls.SIGN.IN} element={(<SignInPage />)} />
          <Route path={Urls.OAUTH.INDEX} element={(<OauthPage />)} />
          <Route path={Urls.OAUTH.GITHUB} element={(<OauthGithubPage />)} />
          <Route path={Urls.KIT.INDEX} element={(<KitPage />)} />
          <Route path={Urls[404]} element={(<NotFoundPage />)} />
        </Routes>

        {location.state?.pathname
          && (
            <Routes>
              <Route path={Urls.SUPPORT.INDEX} element={(<SupportModalPage />)} />
              <Route path={Urls.PROFILE.INDEX} element={(<ProfileModalPage />)} />
              <Route path={Urls.USERS.INDEX} element={(<UsersModalPage />)} />
            </Routes>
          )}
      </DndProvider>
    </ThemeContext.Provider>
  );
}
