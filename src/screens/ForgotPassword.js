import React, { useState } from 'react'
import TMlogo from '../icons/TMlogo';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword(props) {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [isEmailInForgPaswNotFound, setIsEmailInForgPaswNotFound] = useState(false);

  return (
    <div className="container">
      <div>
        <div className="auth-title-container">Forgot Password</div>
      </div>
      <div>
        <TMlogo />
      </div>

      {isEmailInForgPaswNotFound && (
          <div className="error-message">Email not found</div>
        )}

      <div>
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

        <div className="submit-container">
          <button className="submit-button"
            onClick={() => {
                const isOk=props.sendChangePasswordRequest(email);
                //TODO: check if email was found or not
                if(isOk) {
                  navigate('/change-password-info');
                } 
                else {
                  setIsEmailInForgPaswNotFound(true);
                }
            }}
            >
                Send email</button>
        </div>
      </div>

      <div className="login-signup-container">
          <button className="login-signup-button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
      </div>
    </div>
  )
}

export default ForgotPassword