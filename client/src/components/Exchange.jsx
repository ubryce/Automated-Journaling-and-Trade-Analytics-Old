import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Exchanges from './Exchanges';
import ExchangeAdd from './ExchangeAdd';


const Exchange = () => {
  return (
    <Routes>
        <Route path={'/'} element={<Exchanges/>} /> 
        <Route path={'/add'} element={<ExchangeAdd/>} /> 
    </Routes>
  )
}

export default Exchange