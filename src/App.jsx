import React, {useContext} from 'react'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import WelcomePage from './components/expense/WelcomePage';
import UserDetailsUpdate from './components/expense/UserDetailPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgetPassword from './components/forgetPassword/ForgetPassword';
import ExpenseContext from './components/store/expense-context';
import Expenses from "./components/expenseList/Expenses"

function App() {
   const context= useContext(ExpenseContext)
   console.log(context)

  return (
    <>
    <BrowserRouter>
    <Routes>
     {!context.isLogin && <Route path='/signup' element={<Signup />}></Route>} 
    { !context.isLogin && <Route path='/login' element={<Login />}></Route>}
    { context.isLogin &&  <Route path='/welcome' element={<WelcomePage />}></Route>}
    { !context.isLogin &&  <Route path='/forgetpassword' element={<ForgetPassword/>}></Route>}
    { context.isLogin &&  <Route path='/expenses' element={<Expenses/>}></Route>}
      
    { context.isLogin &&  <Route path="/user" element= {<UserDetailsUpdate />}></Route>}
    { !context.isLogin?<Route path='/*' element={<Signup />}></Route>:<Route path='/*' element={<WelcomePage/>}></Route>}
    
    </Routes>
   
   </BrowserRouter>
    </>
   
  )
}

export default App