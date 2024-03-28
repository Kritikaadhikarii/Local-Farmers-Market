import React, { useEffect, useState } from "react";
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {LoginPage, SignupPage, ActivationPage, HomePage} from "./Routes.js";
// import ActivationPage from './pages/ActivationPage.jsx';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadUser } from './redux/actions/user.js';
import Store from "./redux/store";

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
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/activation/:activation:token' element={<ActivationPage />} />
    </Routes>

    {/* // uusing it for notifications */}
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
