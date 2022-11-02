import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './routes/Home';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="" />
      </Routes>
    </BrowserRouter>
  );
};
