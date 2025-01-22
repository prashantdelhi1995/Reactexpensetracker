import React, { useState, useEffect} from 'react'
import ExpenseContext from './expense-context'

function ContextProvider(props) {
    const [isLogin, setLogin] = useState(false);

    const loginHandler = (value) => {
      setLogin(value);
    };
  
    useEffect(() => {
      const localIsLogin = localStorage.getItem("JWTTOKEN");
      if (localIsLogin === null) {
        setLogin(false);
      } else if (localIsLogin === "") {
        setLogin(false);
      } else if (localIsLogin.trim().length > 0) {
        setLogin(true);
      }
    }, []);
  
    const contextData = {
      isLogin: isLogin,
      login: loginHandler,
    };
  

  return (
    <ExpenseContext.Provider value={contextData}>
        {props.children}
    </ExpenseContext.Provider>
  )
}

export default ContextProvider