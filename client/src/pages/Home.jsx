import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <Button variant="contained" onClick={() => navigate('/dashboard')}>Dashboard</Button>
      <Button variant="contained" onClick={() => navigate('/signup')}>Sign Up</Button>
      <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
      Home
    </div>
  );
}

export default Home;
