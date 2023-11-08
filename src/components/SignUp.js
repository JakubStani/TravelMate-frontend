import React, {useState} from "react";
import "./LoginSignup.css"

const SignUp = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const sendSignUpData = (data) => {
        data.preventDefault();
        const newUser = { firstName, lastName, email, password1};

        console.log(newUser); //TODO: add fetch POST method to send new user data to backend
    }

    return (
        <div className="container">
            <div>
                <div className="component-title-container">Sign Up</div>
            </div>

            <form onSubmit={sendSignUpData}>

                <div name="first_name" className="input">
                <input 
                    type="text"
                    required 
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    ></input>
                </div>

                <div name="last_name" className="input">
                <input 
                    type="text"
                    required 
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) => setlastName(event.target.value)}
                    ></input>
                </div>

                <div name="email" className="input">
                    <input 
                        type="email"
                        required 
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                     ></input>
                </div>

                <div name="password1" className="input">
                    <input 
                        type="password"
                        required 
                        placeholder="Password"
                        value={password1}
                        onChange={(event) => setPassword1(event.target.value)}
                        ></input>
                </div>


                <div name="password2" className="input">
                    <input 
                        type="password"
                        required 
                        placeholder="Repeat Password"
                        value={password2}
                        onChange={(event) => setPassword2(event.target.value)}
                        ></input>
                </div>

                <div className="submit-container">
                    <button className="submit-button">Create an account</button>
                </div>
            </form>

            <div className="login-signup-container">
                <div className="submit">
                    <button onClick={() => {props.updateLoginOrSignUp('Login')}}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp