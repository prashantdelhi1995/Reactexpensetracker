import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../reduxStore/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxNRatg_aaFZF_iZMzpdqW0HLlPws8RH8",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("data", data);
        localStorage.setItem("JWTTOKEN", data.idToken);
        localStorage.setItem("userID", data.localId);
        localStorage.setItem("Email", data.email);
        setEmail("");
        setPassword("");
        dispatch(authActions.login(true)); // Correct Redux Dispatch
        navigate("/welcome"); // Redirect on success
      } else {
        const data = await res.json();
        alert("Wrong credentials: " + data.error.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleEmailChange}
            value={email}
            id="email"
            type="email"
            placeholder="please enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={handlePasswordChange}
            value={password}
            placeholder="please enter your password"
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
          <Link to="/forgetpassword">Forgot password?</Link>
          <button type="button" onClick={() => navigate("/signup")}>
            Don't have an account? Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
