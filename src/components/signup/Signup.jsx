import React,{useRef, useState} from 'react'
import classes from './Signup.module.css';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const navigate= useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  let email= useRef('')
  let confirmPassword=useRef('')
  let password=useRef('')
   async function handleFromSubmit(event){
    event.preventDefault()
    const emailValue = email.current.value.trim(); // Trim spaces
    const passwordValue = password.current.value.trim(); // Trim spaces
    const confirmPasswordValue = confirmPassword.current.value.trim(); 
    console.log("email "+emailValue+ "pass "+passwordValue+" confpas "+confirmPasswordValue);
    
    if(emailValue.includes("@") && passwordValue.length>=6 && passwordValue== confirmPasswordValue  ){
      setIsLoading(true); 
      let obj={
        email:email.current.value,
        password:confirmPassword.current.value,
        returnSecureToken:false
      }
      let res=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxNRatg_aaFZF_iZMzpdqW0HLlPws8RH8",
        {
          method:"POST",
          body:JSON.stringify(obj),
          headers: { "Content-Type": "application/json" }
        }
      );
      let data={}
      if(res.ok){
        data= await res.json()
        email.current.value = "";
        password.current.value = "";
        confirmPassword.current.value = "";
        alert("sucessfully account has been created")
        }
        navigate("/login")
        console.log(data)
      
      
    }
    else{
      alert("invalid credentials");
    }
    setIsLoading(false); 
   
  }
  return (
<React.Fragment>
    <div >
      
        <form onSubmit={handleFromSubmit}>
        <h1>signup page</h1>
          <div>
            <label htmlFor='signup'>Email :</label>
            <input type="text" ref={email} id="signup" ></input>
            </div>
            <div>
            <label htmlFor='password'>Password :</label>
            <input type="password" ref={password} id="password" ></input>
            </div>
            <div>
            <label htmlFor='confirmPassword'>confirmPassword :</label>
         
            <input type="password" ref={confirmPassword} id="confirmPassword" className="border p-2 w-full"  ></input>
            </div>
            <div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            <button type="button" onClick={()=>{navigate("/login")}} > have an account?Login </button>
            </div>
            <div>

            </div>


            
        </form>
      
    
    </div>
</React.Fragment>
  )
}

export default Signup