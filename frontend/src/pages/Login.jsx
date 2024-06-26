import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from "../components/Login/Login.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    // in case if user is already logged in
    if(isAuthenticated === true){
      // thiss will naviagate to root url
      navigate("/");
    }
  }, [])
  
  return (
    <div>
        <Login />
    </div>
  )
}

export default LoginPage;