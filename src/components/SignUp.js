import React, { useState } from "react";
import "./LoginSignup.css"
import { Link, useNavigate } from "react-router-dom";
import TMlogo from "../icons/TMlogo";


const SignUp = (props) => {
    const navigate = useNavigate();
    const [firstname, setFirstName] = useState('');
    const [lastname, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordError, setPasswordError] = useState("");
    const [isSignUpError, setIsSignUpError] = useState(false);

    const sendSignUpData = (data) => {
        data.preventDefault();
        if (password !== password2) {
            setIsSignUpError(false);
            setPasswordError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setIsSignUpError(false);
            setPasswordError("Password must be at least 8 characters long");
            return;
        }

        setPasswordError("");
        const newUser = { firstname, lastname, email, password };

        fetch('https://travelmatebackend.azurewebsites.net/api/v1/auth/register', {
          method: 'POST',
          body: JSON.stringify(newUser),
          headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
          }
        })
        .then(response => {
            if(!response.ok) {
                setPasswordError(false);
                setIsSignUpError(true);
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            response.text();
        })
        .then(result => {
            console.log(result);
            navigate('/');
        })
        .catch(error => console.log('error', error));
        //.then((response) => console.log(response.json()))

        //console.log(JSON.stringify(newUser)); //TODO: add fetch POST method to send new user data to backend
    }

    return (
        <div className="container">
            <div>
                <div className="auth-title-container">Sign Up</div>
            </div>

            <div>
                <TMlogo />
            </div>

            {isSignUpError && (
                    <div className="error-message">Error <br /> Account could not been created</div>
                )}

            <form onSubmit={sendSignUpData}>

                <div name="first_name" className="input-div">
                    <input
                        className="input"
                        type="text"
                        required
                        placeholder="First Name"
                        value={firstname}
                        onChange={(event) => setFirstName(event.target.value)}
                    ></input>
                </div>

                <div name="last_name" className="input-div">
                    <input
                        className="input"
                        type="text"
                        required
                        placeholder="Last Name"
                        value={lastname}
                        onChange={(event) => setlastName(event.target.value)}
                    ></input>
                </div>

                <div name="email" className="input-div">
                    <input
                        className="input"
                        type="email"
                        required
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    ></input>
                </div>

                <div name="password1" className="input-div">
                    <input
                        className="input"
                        type="password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword1(event.target.value)}
                    ></input>
                </div>


                <div name="password2" className="input-div">
                    <input
                        className="input"
                        type="password"
                        required
                        placeholder="Repeat Password"
                        value={password2}
                        onChange={(event) => setPassword2(event.target.value)}
                    ></input>
                </div>

                {passwordError && (
                    <div className="error-message">{passwordError}</div>
                )}

                <div className="submit-container">
                    <button className="submit-button">Create an account</button>
                </div>
            </form>

            <div className="login-signup-container">
                <div className="submit">
                    <Link to="/"><button className="login-signup-button" onClick={() => { props.updateLoginOrSignUp('Login') }}>Login</button></Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp