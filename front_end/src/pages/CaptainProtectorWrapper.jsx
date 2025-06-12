// src/components/CaptainProtectorWrapper.jsx

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/usercontext';
import axios from 'axios';

const CaptainProtectorWrapper = ({ children }) => {
  const [captain, setcaptain] = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
         // console.log('Captain profile fetched:', response.data.captain);
          setcaptain(response.data.captain);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('Authentication failed:', error);
        localStorage.removeItem('token');
        navigate('/captain-login');
        setIsLoading(false);
      });
  }, [navigate, setcaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectorWrapper;
