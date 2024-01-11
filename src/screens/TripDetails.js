import React, {useState} from 'react'
import SideBar from '../shared/SideBar'
import NavBar from '../shared/NavBar'
import { useLocation } from 'react-router-dom';
import TripDetailsContainer from '../components/TripDetailsContainer';

function TripDetails(props) {

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
          const jsonResult = JSON.parse(result);
        })
        .catch(error => console.log('error', error));
    }
    //const [title, setTitle] = useState('');

    // if (location.state) {
    //     setTitle(location.state['title']);
    //   }

  return (
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
                    />

            </header>
        </div>
      }
    />

  )
}

export default TripDetails