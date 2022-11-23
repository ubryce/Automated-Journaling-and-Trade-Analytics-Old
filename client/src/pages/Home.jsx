import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (user) navigate('/dashboard');
  }, [navigate]);

  return (
    <div>
      Home
    </div>
  );
}

export default Home;
