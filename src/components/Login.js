import React, { useState } from "react";
import "./LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";
import TMlogo from "../icons/TMlogo";


const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser]= useState({})
    const [userToken, setUserToken] = useState('')

    const sendLoginData = (data) => {
        data.preventDefault();
        const userData = { email: email, password: password};  

        fetch('https://travelmatebackend.azurewebsites.net/api/v1/auth/authenticate', {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => response.text())
        .then(result => {
          const jsonResult = JSON.parse(result);
          console.log(jsonResult);
          setUserToken(jsonResult['access_token']);
          localStorage.setItem("userToken", jsonResult['access_token']);
          console.log(JSON.stringify(userData)); //TODO: add fetch POST method to send user data to backend
          navigate('/home');
        })
        .catch(error => console.log('error', error));

        /*.then((response) => {
          setUser(response.json());
          localStorage.setItem('user', response.json());
          console.log(response.json());
        })*/
        
    }

  return (
    <div className="container">
      <div>
        <div className="auth-title-container">Login</div>
      </div>
      <div>
        <TMlogo />
      </div>
      <form onSubmit={sendLoginData}>
        <div name="email" className="input-div">
          <input 
            className="input"
            type="email" 
            required
            placeholder="Email"
            value={email}
            onChange={(value) => setEmail(value.target.value)}
            ></input>
        </div>

        <div name="password1" className="input-div">
          <input 
            className="input"
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

      <div className="forgot-password" onClick={() => navigate('/forgot-password')}>Forgot password?</div>

      <div className="login-signup-container">
        <Link to="/sign-up">
          <button className="login-signup-button"
            onClick={() => {
              props.updateLoginOrSignUp("SignUp");
            }}
          >
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
