import React, { useEffect, useState } from 'react'
import SideBar from '../shared/SideBar';
import NavBar from '../shared/NavBar';
import './ProfileScreen.css';
import { useNavigate } from 'react-router-dom';

function ProfileScreen(props) {

  const navigate = useNavigate();

  document.title = `Profile`;

  const [myData, setMyData] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isEdit,setIsEdit] = useState(false);

  const changeEmail = () => {
    fetch(`https://travelmatebackend.azurewebsites.net/api/v1/users/change-email`, {
        method: 'PATCH',
        body: email,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`

        },
        redirect: 'follow',
        //mode: 'no-cors'
      }).then(response => response.text())
      .then(result => {
        console.log("result1", result);
      })
      .catch(error => console.log('error', error));
  }


  useEffect(() => {
    fetch('https://travelmatebackend.azurewebsites.net/api/v1/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`

          },
          redirect: 'follow',
          //mode: 'no-cors'
        }).then(response => response.text())
        .then(result => {
          const jsonResult = JSON.parse(result);
          setMyData(jsonResult);
        })
        .catch(error => console.log('error', error));
  }, []);

  useEffect(() => {
    setUserDataToShow();
  }, [myData]);

  const setUserDataToShow = () => {
    setFirstName(myData['firstname']);
    setLastName(myData['lastname']);
    setEmail(myData['email']);
  };

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
              <form>
                <div className='profile-specific-data-container'>
                    <p>First name</p>
                    {!isEdit&&<p>{firstName}</p>}
                    {isEdit &&
                      <input 
                      className="input"
                      type="text" 
                      required
                      placeholder="Last name"
                      value={firstName}
                      onChange={(value) => setFirstName (value.target.value)}
                      ></input>}
                </div>
                <div className='profile-specific-data-container'>
                    <p>Last name</p>
                    {!isEdit&&<p>{lastName}</p>}
                    {isEdit &&
                      <input 
                      className="input"
                      type="text" 
                      required
                      placeholder="Last name"
                      value={lastName}
                      onChange={(value) => setLastName (value.target.value)}
                      ></input>}
                </div>
                <div className='profile-specific-data-container'>
                    <p>Email</p>
                    {!isEdit&&
                      <p>{email}</p>
                      }
                    {isEdit &&
                      <input 
                      className="input"
                      type="email" 
                      required
                      placeholder="Email"
                      value={email}
                      onChange={(value) => setEmail(value.target.value)}
                      ></input>}
                </div>
              </form>
            </div>
            <div className='profile-action-container'>
                {!isEdit&&<div onClick={()=>setIsEdit(true)}>
                    <p>Edit</p>
                </div>}
                {isEdit&&<div onClick={()=> {
                  setIsEdit(false);
                  changeEmail();
                  }}>
                    <p>Save</p>
                </div>}
                {isEdit&&<div onClick={()=>{
                  setIsEdit(false);
                  setUserDataToShow();
                  }}>
                    <p>Cancel</p>
                </div>}
            </div>

            <div className='profile-action-container'
              onClick={() => {
                props.sendChangePasswordRequest(email);
                navigate('/change-password-info');}
              }
              >
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