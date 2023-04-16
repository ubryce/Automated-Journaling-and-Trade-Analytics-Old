import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Journals from './Journals'
import JournalAdd from './JournalAdd';
import JournalView from './JournalView';
import TradeAdd from './TradeAdd';
import TradeView from './TradeView';


const Journal = () => {
  return (
    <Routes>
        <Route path={'/'} element={<Journals/>} /> 
        <Route path={'/add'} element={<JournalAdd/>} /> 
        <Route path={'/:id'} element={<JournalView/>} />
        <Route path={'/:id/add'} element={<TradeAdd/>} />
        <Route path={'/:id/:id'} element={<TradeView/>} />
        <Route path={'/:id/:id/edit'} element={<TradeAdd/>} />
    </Routes>
  )
}

export default Journal