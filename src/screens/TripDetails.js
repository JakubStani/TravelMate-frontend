import React, {useState} from 'react'
import SideBar from '../shared/SideBar'
import NavBar from '../shared/NavBar'
import { useLocation } from 'react-router-dom';
import TripDetailsContainer from '../components/TripDetailsContainer';

function TripDetails(props) {

    const location = useLocation();

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
                    />

            </header>
        </div>
      }
    />

  )
}

export default TripDetails