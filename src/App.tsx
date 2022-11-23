import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './routes/Home';
import { Register } from './routes/Register';
import { Login } from './routes/Login';
import { navigationPaths } from './config/navigationPaths';
import { MainRoom } from './routes/MainRoom';
import { Preparation } from './routes/Preparation';
import { AuthenticatedOnly } from './containers/AuthenticatedOnly';
import { authenticateUser } from './utils/authenticateUser';
import { Game } from './routes/Game';

authenticateUser();

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="" />
        <Route element={<Register />} path={navigationPaths.register} />
        <Route element={<Login />} path={navigationPaths.login} />
        <Route
          element={
            <AuthenticatedOnly>
              <MainRoom />
            </AuthenticatedOnly>
          }
          path={navigationPaths.mainRoom}
        />
        <Route
          element={
            <AuthenticatedOnly>
              <Preparation />
            </AuthenticatedOnly>
          }
          path={navigationPaths.preparation + '/:gameId/:type'}
        />
        <Route
          element={
            <AuthenticatedOnly>
              <Game />
            </AuthenticatedOnly>
          }
          path={navigationPaths.game + '/:gameId/:type'}
        />
      </Routes>
    </BrowserRouter>
  );
};
