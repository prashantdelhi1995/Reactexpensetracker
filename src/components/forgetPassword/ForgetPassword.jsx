import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ForgetPassword() {
  const navigate= useNavigate();
    const [email , setEmail]= useState("")
    const[isLoading, setIsLoading]= useState(false)
   const handleOnchange=(e)=>{
    setEmail(e.target.value)
   }
   async function handleOnSubmit(event){
    event.preventDefault();
    if(!email.includes("@")){
      return

    }
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAxNRatg_aaFZF_iZMzpdqW0HLlPws8RH8",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        alert(`Link successfully send to ${email}`);
        navigate("/login");
      } else {
        const data = await res.json();
        alert(data.error.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Something went wrong");
      console.log(error);
      setIsLoading(false);
    }
  };
  const gotoHandler = (event) => {
    event.preventDefault();
    navigate("/login");
  };
   

   
  return (
    <form onSubmit={handleOnSubmit}>
        <label htmlFor='email' ></label>
        <input type="text" value={email}  id="email" onChange={handleOnchange}  placeholder='entere email' ></input>
        <button type="submit" > {isLoading?"Loading...":"Submit" } </button>
        <label>
          Know your password?{" "}
          <button
            onClick={gotoHandler}
            className="border-2 bg-gray-700 p-1 px-2 rounded-md"
          >
            Login
          </button>
        </label>
    </form>
  )
}

export default ForgetPassword