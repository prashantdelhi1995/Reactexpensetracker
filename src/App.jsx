import React from 'react'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import WelcomePage from './components/expense/WelcomePage';
import UserDetailsUpdate from './components/expense/UserDetailPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/welcome' element={<WelcomePage />}></Route>
      
      <Route path="/user" element= {<UserDetailsUpdate />}>
        </Route>
        <Route path='/*' element={<Signup />}></Route>

    </Routes>
   
   </BrowserRouter>
    </>
   
  )
}

export default App