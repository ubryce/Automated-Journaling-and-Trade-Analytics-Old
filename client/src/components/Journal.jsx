import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Journals from './Journals'
import JournalAdd from './JournalAdd';
import JournalView from './JournalView';
import TradeAdd from './TradeAdd';

const Journal = () => {
  return (
    <Routes>
        <Route path={'/'} element={<Journals/>} /> 
        <Route path={'/add'} element={<JournalAdd/>} /> 
        <Route path={'/:id'} element={<JournalView/>} />
        <Route path={'/:id/add'} element={<TradeAdd/>} />
    </Routes>
  )
}

export default Journal