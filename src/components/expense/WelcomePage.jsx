import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExpenseContext from "../store/expense-context";

const WelcomePage = () => {
  const context= useContext(ExpenseContext)
  const [checkVerified, setVerified] = useState(false);
  const navigate= useNavigate()

  const handleOnLogOut= async()=>{
    localStorage.clear()
    context.login(false)
    //navigate("/login")


   }
  const autoVerifiedEmailCheck = async () => {
    // const jwttoken = localStorage.getItem("JWTTOKEN");
    const token = localStorage.getItem("JWTTOKEN");
    

 

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAxNRatg_aaFZF_iZMzpdqW0HLlPws8RH8",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            oobCode: "User Verified. Thank you!!",
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data.emailVerified);
        console.log("send success");
        if (data.emailVerified) {
          setVerified(true);
        }
      }
    } catch (error) {
      console.log(`Error = ${error}`);
    }
  };
  useEffect(() => {
    autoVerifiedEmailCheck();
  }, []);

  const verifyHandler = async () => {
    const token = localStorage.getItem("JWTTOKEN");
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAxNRatg_aaFZF_iZMzpdqW0HLlPws8RH8",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            requestType: "VERIFY_EMAIL",
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
        console.log("Send success");
        alert("verification mail sent!!");
      }
    } catch (error) {
      console.log(`Error = ${error}`);
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl text-slate-600 p-4 flex-initial">
          Welcome to expense tracker!!!
        </p>

        <div className="flex-initial ml-auto p-5 ">
          <label className="border bg-orange-100 p-1 rounded-md px-2">
            Your Profile is incomplete.
            <Link to="/user" className="text-blue-600">
              Complete Now
            </Link>
          </label>
        </div>
        <div>
          {!checkVerified && (
            <button onClick={verifyHandler}>Verify Email</button>
          )}
        </div>
        <div>
          <button onClick={handleOnLogOut}>LogOut</button>
        </div>
      </div>
      <hr className="border-gray-300 border-1"></hr>
    </div>
  );
};

export default WelcomePage;
