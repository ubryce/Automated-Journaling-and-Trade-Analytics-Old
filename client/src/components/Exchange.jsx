import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Exchanges from './Exchanges';
import ExchangeAdd from './ExchangeAdd';
import ExchangeView from './ExchangeView';

const Exchange = () => {
  return (
    <Routes>
        <Route path={'/'} element={<Exchanges/>} /> 
        <Route path={'/add'} element={<ExchangeAdd/>} /> 
        <Route path={'/:id'} element={<ExchangeView/>} /> 
    </Routes>
  )
}

export default Exchange