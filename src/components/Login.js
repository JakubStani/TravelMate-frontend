import React, { useState } from "react";
import "./LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";


const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sendLoginData = (data) => {
        data.preventDefault();
        const user = { email, password};
        
        console.log(user); //TODO: add fetch POST method to send user data to backend
        navigate('/home');
    }

  return (
    <div className="container">
      <div>
        <div className="component-title-container">Login</div>
      </div>
      <form onSubmit={sendLoginData}>
        <div name="email" className="input">
          <input 
            type="email" 
            required
            placeholder="Email"
            value={email}
            onChange={(value) => setEmail(value.target.value)}
            ></input>
        </div>

        <div name="password1" className="input">
          <input 
            type="password" 
            required
            placeholder="Password"
            value={password}
            onChange={(value) => setPassword(value.target.value)}
            ></input>
        </div>

        <div className="submit-container">
          <button className="submit-button">Submit</button>
        </div>
      </form>

      <div className="forgot-password">Forgot password</div>

      <div className="login-signup-container">
        <div className="submit">
          <Link to="/sign-up">
            <button
              onClick={() => {
                props.updateLoginOrSignUp("SignUp");
              }}
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
