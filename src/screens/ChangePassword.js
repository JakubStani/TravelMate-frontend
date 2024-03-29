import React, { useState } from 'react'
import SideBar from '../shared/SideBar'
import NavBar from '../shared/NavBar'
import './ChangePassword.css'
import { useNavigate, useParams } from 'react-router-dom'

function ChangePassword(props) {

  const navigate=useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');

  const {token} = useParams();

  const submitPasswordChange = (event) =>{
      event.preventDefault();

      fetch(`https://travelmatebackend.azurewebsites.net/api/v1/auth/resetPassword?token=${token}`, {
        method: 'POST',
        body: JSON.stringify({newPassword: newPassword}),
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
      }).then(response => response.text())
      .then(result => {
        console.log("result1", result);
        localStorage.clear();
        navigate('/');
      })
      .catch(error => console.log('error', error));
  }

  //TODO: check if user is logged in or not and adjust view to it
  return (
    <div className="App">
        <header>
            <div className='change-password-title-container'>Change password</div>

            <div className='shared-plan-data-container'>
                <form onSubmit={submitPasswordChange}>
                    <div name="newPassword" className="input">
                    <input 
                        type="text" 
                        required
                        placeholder="New password"
                        value={newPassword}
                    onChange={(value) => setNewPassword(value.target.value)}
                        ></input>
                    </div>

                    <div name="confirmedNewPassword" className="input">
                    <input 
                        type='text' 
                        required
                        placeholder="Confirme new password"
                        value={confirmationPassword}
                        onChange={(value) => setConfirmationPassword(value.target.value)}
                        ></input>
                    </div>

                    <div className="submit-container">
                    <button className="submit-button">Submit</button>
                    </div>
                </form>

            </div>
        </header>
    </div>
  );
}

export default ChangePassword