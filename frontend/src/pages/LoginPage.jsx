import React, { useEffect } from 'react'
import Login from "../components/Login/Login.jsx";
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const {isAuthenticated } = useSelector((state) => state.user);

  useEffect (() =>{
    // in case if user is already logged in
    if (isAuthenticated === true ){

      navigate("/");
    }
  }, [])


  return (
    <div>
        <Login />
    </div>
  )
}

export default LoginPage