import React, { useState } from 'react'
import SideBar from '../shared/SideBar'
import NavBar from '../shared/NavBar'
import './ChangePassword.css'

function ChangePassword(props) {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmedNewPassword, setConfirmedNewPassword] = useState('');

    const submitPasswordChange = (event) =>{
        event.preventDefault();
        console.log('new password ')
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
                            value={confirmedNewPassword}
                            onChange={(value) => setConfirmedNewPassword(value.target.value)}
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