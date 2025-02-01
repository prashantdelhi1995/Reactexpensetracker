import React, {useContext, useEffect} from 'react'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import WelcomePage from './components/expense/WelcomePage';
import UserDetailsUpdate from './components/expense/UserDetailPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgetPassword from './components/forgetPassword/ForgetPassword';
import ExpenseContext from './components/store/expense-context';
import Expenses from "./components/expenseList/Expenses"
import { authActions } from './components/reduxStore/auth';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/navbar/Navbar';

function App() {
   const isLogin= useSelector(state=>state.auth.isAuthenticated)
   console.log(isLogin)
   const dispatch= useDispatch()
   useEffect(()=>{
    dispatch(authActions.checker());

   },[])


  return (
    <>
    <BrowserRouter>
    <Routes>
    <Navbar />
     {!isLogin && <Route path='/signup' element={<Signup />}></Route>} 
    { !isLogin && <Route path='/login' element={<Login />}></Route>}
    { isLogin &&  <Route path='/welcome' element={<WelcomePage />}></Route>}
    { !isLogin &&  <Route path='/forgetpassword' element={<ForgetPassword/>}></Route>}
    {isLogin &&  <Route path='/expenses' element={<Expenses/>}></Route>}
      
    { isLogin &&  <Route path="/user" element= {<UserDetailsUpdate />}></Route>}
    { !isLogin?<Route path='/*' element={<Signup />}></Route>:<Route path='/*' element={<WelcomePage/>}></Route>}
    
    </Routes>
   
   </BrowserRouter>
    </>
   
  )
}

export default App