
import React,{useState} from 'react'
import classes from "./Login.module.css"
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate= useNavigate();
    const [email, setEmail]=useState('');
    const[password, setPassword]=useState('');
    function handleEmailChange(event){
        setEmail(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }
    async function  handleOnSubmit(event){
        event.preventDefault();
        try{
      const res=  await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxNRatg_aaFZF_iZMzpdqW0HLlPws8RH8",{
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },


})
        if(res.ok){
            const data=  await res.json()
            localStorage.setItem("JWTTOKEN", data.idToken);
            localStorage.setItem("userID", data.localId);
            localStorage.setItem("Email", data.email);
            setEmail("")
            setPassword("")
            navigate("/welcome")
        }
        else{
            const data= await res.json()
            throw new Error(data.error.message || "Something went wrong.");

        }
    }
    catch(error){
        console.log(error)
    };
    
        
        
    }

    
  return (
    <div>
        <form onSubmit={handleOnSubmit} action="">
            <div>
            <label id="email" >Email</label>
            <input onChange={handleEmailChange}  id="email" type="email" placeholder='please enter your email'></input>
            </div>
            <div>
            <label id="password" >Password</label>
            <input id="password" type="password" onChange={handlePasswordChange}  placeholder='please enter your password'></input>
            </div>
            <div>
                <button type="submit">submit</button>
                <Link to="/forgetpassword">Do you forget password?</Link>
                <button type="button" onClick={()=>{navigate("/signup")}}>Dont have acoount? Signup</button>
            </div>
        </form>
    </div>

  )
}

export default Login