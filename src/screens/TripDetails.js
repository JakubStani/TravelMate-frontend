import React, {useEffect, useState} from 'react'
import SideBar from '../shared/SideBar'
import NavBar from '../shared/NavBar'
import { useLocation, useNavigate } from 'react-router-dom';
import TripDetailsContainer from '../components/TripDetailsContainer';

function TripDetails(props) {

  const navigate = useNavigate()

  const location = useLocation();
  const signUpForTrip =() => {
    fetch(`https://travelmatebackend.azurewebsites.net/api/v1/trips/sign-up/${location.state['id']}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`

        },
        redirect: 'follow',
        //mode: 'no-cors'
      }).then(response => response.text())
      .then(result => {
        const newUTR='signed-up';
        console.log('sign up!');
        setUserTriprelation(newUTR);
      })
      .catch(error => console.log('error', error));
  };
  //const [title, setTitle] = useState('');

  const signOutOfTrip =() => {
    fetch(`https://travelmatebackend.azurewebsites.net/api/v1/trips/sign-out/${location.state['id']}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`

        },
        redirect: 'follow',
      }).then(response => response.text())
      .then(result => {
        console.log('signOutRes', result);
        const newUTR='no-relation';
        setUserTriprelation(newUTR);
      })
      .catch(error => console.log('error', error));
  };

  //user trip relation
  const [userTripRelation, setUserTriprelation] =useState();
  const checkUserTripRelation= () => {
    fetch(`https://travelmatebackend.azurewebsites.net/api/v1/trips/is-created/${location.state['id']}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`

      },
      redirect: 'follow',
    }).then(response => response.text())
    .then(result => {
        console.log('is', result);
        console.log(userTripRelation);
      if(result==='true') {
        const newUTR='author';
        setUserTriprelation(newUTR);
        console.log('author');
      }
      else {
        isUserSignedUpForThisTrip();
      }
    })
    .catch(error => console.log('error', error));
  };

  const isUserSignedUpForThisTrip = () => {
    fetch(`https://travelmatebackend.azurewebsites.net/api/v1/trips/is-signed-up/${location.state['id']}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`

      },
      redirect: 'follow',
    }).then(response => response.text())
    .then(result => {
      if(result ==='true') {
        const newUTR='signed-up';
        setUserTriprelation(newUTR);
      }
      else {
        const newUTR='no-relation';
        setUserTriprelation(newUTR);
      }
    })
  }
  //**********

  // if (location.state) {
  //     setTitle(location.state['title']);
  //   }

  const [allowedToRender, setAllowedToRender] = useState(false);
  useEffect(() => {
    //checks whether user is logged in
    //if not, redirects to login page
    if(localStorage.getItem('userToken')==null)
    {
      props.setLoginSignUp('Login');
      navigate('/');
    }
    else {
      checkUserTripRelation();
      setAllowedToRender(true);
    }
  }, []);

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
                      <TripDetailsContainer 
                        tripData={location.state}
                        signUpForTrip={signUpForTrip}
                        signOutOfTrip={signOutOfTrip}
                      />
                      {userTripRelation==='no-relation' &&
                        <div className='profile-action-container'>
                            <div onClick={()=> signUpForTrip()}>
                                <p>Sign up for this trip</p>
                            </div>
                        </div>
                        }
                        {userTripRelation==='signed-up' &&
                        <div className='profile-action-container'>
                            <div onClick={()=> signOutOfTrip()}>
                                <p>Sign out of this trip</p>
                            </div>
                        </div>
                      }

              </header>
          </div>
        }
      />
    }
  </div>

  )
}

export default TripDetails