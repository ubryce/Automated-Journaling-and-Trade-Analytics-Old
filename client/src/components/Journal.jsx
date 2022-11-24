import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Journals from './Journals'
import JournalAdd from './JournalAdd';

const Journal = () => {
  return (
    <Routes>
        <Route path={'/'} element={<Journals/>} /> 
        <Route path={'/add'} element={<JournalAdd/>} /> 
    </Routes>
  )
}

export default Journal