import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Portfolio from '../pages/Portfolio';

const AppRouter = () => {
    return (
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route  path='/portfolio' element={<Portfolio/>}/>
          <Route path="*" element={<Home to="/" />} />
        </Routes>
    );
};

export default AppRouter;