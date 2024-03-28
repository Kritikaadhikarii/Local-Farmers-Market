// import React from 'react'
import React, { useEffect, useState } from "react";
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {LoginPage, SignupPage} from "./Routes.js";
import ActivationPage from './pages/ActivationPage.jsx';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { loadUser } from './redux/actions/user.js';

const App = () => {
  useEffect(() => {
    // axios
    //   .get(`${server}/user/getuser`,{withCredentials:true})
    //   .then((res) => {
    //     toast.success(res.data.message);
    //   })
    //     .catch((err) => {
    //       toast.error(err.response.data.message);

    //     });
    Store.dispatch(loadUser());
  }, []);
  return (

    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/activation/:activation:token' element={<ActivationPagePage />} />
    </Routes>

    //uusing it for notifications
    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>

  ) 
}

export default App
