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
  const [shoulDDelete, setShoulDDelete] = useState(false);

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
      }).then(response => {
        if(!response.ok){
          setUserDataToShow();
          throw new Error('Error: email could not been changed');
        }
        return response.text();
      })
      .then(result => {
        console.log("result1", result);
      })
      .catch(error => console.log('error', error));
  };

  const changeNameAndLastName = () => {
    fetch(`https://travelmatebackend.azurewebsites.net/api/v1/users/name`, {
        method: 'PATCH',
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`

        },
        redirect: 'follow',
      }).then(response => {
        if(!response.ok){
          setUserDataToShow();
          throw new Error('Error: name and last name could not been changed');
        }
        return response.text();
      })
      .then(result => {
        console.log("result1", result);
      })
      .catch(error => console.log('error', error));
  };

  const deleteAccount = () => {
    fetch(`https://travelmatebackend.azurewebsites.net/api/v1/auth?email=${myData['email']}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`

        },
        redirect: 'follow',
      }).then(response => {
        if(!response.ok){
          setUserDataToShow();
          throw new Error('Error: name and last name could not been changed');
        }
        return response.text();
      })
      .then(result => {
        localStorage.removeItem('userToken');
        navigate('/');
      })
      .catch(error => console.log('error', error)); 
  }

  const [allowedToRender, setAllowedToRender] = useState(false);
  useEffect(() => {
    //checks whether user is logged in
    //if not, redirects to login page
    if(localStorage.getItem('userToken')!=null)
    {
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
        setAllowedToRender(true);
    }
    else {
      props.setLoginSignUp('Login');
      navigate('/');
    }
    console.log('prof scr is logged in',localStorage.getItem('userToken'));
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
    <div>
      {allowedToRender &&
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

                      if(myData['email']!= email) {
                        changeEmail();
                      }
                      if(myData['firstname']!==firstName || myData['lastname']!==lastName) {
                        changeNameAndLastName();
                      }
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

                {(shoulDDelete==false) &&
                  <div className='profile-action-container' onClick={()=>{
                    console.log(shoulDDelete);
                  setShoulDDelete(true);
                }}>
                    <div>
                        <p>Delete account</p>
                    </div>
                </div>
                }
                {(shoulDDelete==true) ?
                  <div className='profile-action-container'>
                    <div>
                        <p>Are you sure that you want to delete your account?</p>
                        <button onClick={() => {
                          deleteAccount();
                          }}>Yes</button>
                        <button onClick={() => {setShoulDDelete(false); console.log(shoulDDelete);}}>Cancel</button>
                    </div>
                </div> :null
                }
              </header>
            </div>
          }
        />
      }
    </div>
  );
};

export default ProfileScreen;