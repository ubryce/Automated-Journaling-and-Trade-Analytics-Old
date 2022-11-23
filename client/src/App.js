import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';

import  SignIn  from './pages/SignIn.jsx';
import  SignUp  from './pages/SignUp.jsx';
import  Home  from './pages/Home.jsx';

import  Dashboard  from './pages/Dashboard.jsx';
import Journals from './components/Journals';

function App() {

  const navigate = useNavigate();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("userInfo"));
  //   if (!user) navigate('/');
  // }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />

        <Route path="dashboard/*" element={<Dashboard/>} />
      </Routes>
    </div>
  );
}

export default App;
