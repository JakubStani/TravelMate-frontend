import React, { useState } from 'react'
import TMlogo from '../icons/TMlogo';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword(props) {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
  return (
    <div className="container">
      <div>
        <div className="auth-title-container">Forgot Password</div>
      </div>
      <div>
        <TMlogo />
      </div>
      <form onSubmit={props.sendChangePasswordRequest(email)}>
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
          <button className="submit-button">Send email</button>
        </div>
      </form>

      <div className="forgot-password" onClick={() => navigate('/forgot-password')}>Forgot password?</div>

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