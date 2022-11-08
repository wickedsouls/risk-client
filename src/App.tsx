import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './routes/Home';
import { Register } from './routes/Register';
import { Login } from './routes/Login';
import { navigationPaths } from './config/navigationPaths';
import { MainRoom } from './routes/MainRoom';
import { WaitingRoom } from './routes/WaitingRoom';
import { AuthenticatedOnly } from './containers/AuthenticatedOnly';
import { authenticateUser } from './utils/authenticateUser';

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
              <WaitingRoom />
            </AuthenticatedOnly>
          }
          path={navigationPaths.waitingRoom}
        />
      </Routes>
    </BrowserRouter>
  );
};
