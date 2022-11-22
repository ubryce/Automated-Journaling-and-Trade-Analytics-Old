import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';

function App() {
  const { user, setUser } = useStateContext();

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) navigate('/');
  }, [navigate]);

  return (
    <div className="App">
      <header className="App-header">
        Automated Journaling
      </header>
    </div>
  );
}

export default App;
