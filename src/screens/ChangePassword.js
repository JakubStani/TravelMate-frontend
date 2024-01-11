import React, { useState } from 'react'
import SideBar from '../shared/SideBar'
import NavBar from '../shared/NavBar'
import './ChangePassword.css'
import { useNavigate, useParams } from 'react-router-dom'

function ChangePassword(props) {

  const navigate=useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');

  const {token} = useParams();

  const submitPasswordChange = (event) =>{
      event.preventDefault();
      const newPasswordData = {
          "currentPassword": currentPassword,
          "newPassword": newPassword,
          "confirmationPassword": confirmationPassword
      };

      fetch(`https://travelmatebackend.azurewebsites.net/api/v1/auth/resetPassword?token=${token}`, {
        method: 'PATCH',
        body: JSON.stringify(newPasswordData),
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${localStorage.getItem('userToken')}`

        },
        redirect: 'follow',
        //mode: 'no-cors'
      }).then(response => response.text())
      .then(result => {
        console.log("result1", result);
        navigate('/profile');
      })
      .catch(error => console.log('error', error));
  }

  return (
    <SideBar
      sideBarOpen={props.sideBarOpen}
      setSideBarOpen={props.setSideBarOpen}
      toggleSideBar={props.toggleSideBar}
      content={
        <div className="App">
            <header className="App-header">
                <NavBar toggleSideBar={props.toggleSideBar}/>

                <div className='change-password-title-container'>Change password</div>

                <div className='shared-plan-data-container'>
                    <form onSubmit={submitPasswordChange}>
                        <div name="currentPassword" className="input">
                        <input 
                            type='text' 
                            required
                            placeholder="Current password"
                            value={currentPassword}
                            onChange={(value) => setCurrentPassword(value.target.value)}
                            ></input>
                        </div>

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
      }
    />
  );
}

export default ChangePassword