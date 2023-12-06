import React, {useState} from 'react'
import SideBar from '../shared/SideBar'
import NavBar from '../shared/NavBar'
import { useLocation } from 'react-router-dom';

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
                <div>
                    <h1>{location.state['title']}</h1>
                </div>

            </header>
        </div>
      }
    />

  )
}

export default TripDetails