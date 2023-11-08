import React, {useState} from "react";
import "./LoginSignup.css"

const SignUp = (props) => {

    return (
        <div className="container">
            <div>
                <div className="component-title-container">Sign Up</div>
            </div>
            <div name="email" className="input">
                <input type="email" placeholder="Email"></input>
            </div>


            <div name="last_name" className="input">
              <input type="text" placeholder="Last Name"></input>
            </div>


            <div name="password1" className="input">
                <input type="password" placeholder="Password"></input>
            </div>


            <div name="password2" className="input">
                <input type="password" placeholder="Repeat Password"></input>
            </div>


            <div className="submit-container">
                <button className="submit-button">Create an account</button>
            </div>

            <div className="login-signup-container">
                <div className="submit">
                    <button onClick={() => {props.updateLoginOrSignUp('Login')}}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp