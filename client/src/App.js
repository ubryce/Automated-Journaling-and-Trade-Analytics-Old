import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';

import  SignIn  from './pages/SignIn.jsx';
import  SignUp  from './pages/SignUp.jsx';
import  Home  from './pages/Home.jsx';

function App() {
  const { user, setUser } = useStateContext();

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) navigate('/');
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  );
}

export default App;
