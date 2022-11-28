import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Exchanges from './Exchanges';


const Exchange = () => {
  return (
    <Routes>
        <Route path={'/'} element={<Exchanges/>} /> 
    </Routes>
  )
}

export default Exchange