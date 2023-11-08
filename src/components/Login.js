import React, {useState} from "react";
import "./LoginSignup.css"

const Login = (props) => {

    return (
        <div className="container">
            <div>
                <div className="component-title-container">Login</div>
            </div>
            <div name="email" className="input">
                <input type="email" placeholder="Email"></input>
            </div>

            <div name="password1" className="input">
                <input type="password" placeholder="Password"></input>
            </div>

            <div className="submit-container">
                <button className="submit-button">Confirm</button>
            </div>


            <div className="forgot-password">Forgot password</div>


            <div className="login-signup-container">
                <div className="submit">
                    <button onClick={() => {props.updateLoginOrSignUp('SignUp')}}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Login