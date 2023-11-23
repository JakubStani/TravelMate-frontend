import React from 'react'
import SideBar from '../shared/SideBar';
import NavBar from '../shared/NavBar';
import './ProfileScreen.css';

function ProfileScreen(props) {
  return (
    <SideBar
      sideBarOpen={props.sideBarOpen}
      setSideBarOpen={props.setSideBarOpen}
      toggleSideBar={props.toggleSideBar}
      content={
        <div className="App">
          <header className="App-header">
            <NavBar toggleSideBar={props.toggleSideBar}/>
            <div className='profile-title-container'>Profile</div>
            <div className='profile-data-container'>
                <div className='profile-specific-data-container'>
                    <p>First name</p>
                    <p>test</p>
                </div>
                <div className='profile-specific-data-container'>
                    <p>Last name</p>
                    <p>test</p>
                </div>
                <div className='profile-specific-data-container'>
                    <p>Email</p>
                    <p>test</p>
                </div>
            </div>
            <div className='profile-action-container'>
                <div>
                    <p>Edit</p>
                </div>
            </div>

            <div className='profile-action-container'>
                <div>
                    <p>Change password</p>
                </div>
            </div>

            <div className='profile-action-container'>
                <div>
                    <p>Delete account</p>
                </div>
            </div>
          </header>
        </div>
      }
    />
  );
};

export default ProfileScreen;