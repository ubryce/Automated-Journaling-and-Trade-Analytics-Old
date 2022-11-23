import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user) navigate('/');
  }, [navigate]);

  return (
    <div>
      Dashboard
    </div>
  );
}

export default Dashboard;