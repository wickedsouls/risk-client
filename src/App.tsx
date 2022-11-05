import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './routes/Home';
import { Register } from './routes/Register';
import { Login } from './routes/Login';
import { navigationPaths } from './config/navigationPaths';
import { MainRoom } from './routes/MainRoom';
import { WaitingRoom } from './routes/WaitingRoom';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="" />
        <Route element={<Register />} path={navigationPaths.register} />
        <Route element={<Login />} path={navigationPaths.login} />
        <Route element={<MainRoom />} path={navigationPaths.mainRoom} />
        <Route element={<WaitingRoom />} path={navigationPaths.waitingRoom} />
      </Routes>
    </BrowserRouter>
  );
};
