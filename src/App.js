import Home from './screens/Home';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProfileScreen from './screens/ProfileScreen';
import CreatePlan from './screens/CreatePlan';
import TripDetails from './screens/TripDetails';
import ChangePassword from './screens/ChangePassword';
import FriendsScreen from './screens/FriendsScreen';
import ChangePasswordInfo from './screens/ChangePasswordInfo';
import ForgotPassword from './screens/ForgotPassword';

function App() {

  const [loginOrSignUp, setLoginSignUp] = useState("Login");

  //changing site's title
  useEffect(() => {document.title = `TravelMate - ${loginOrSignUp}`}, [loginOrSignUp]);

  const updateLoginOrSignUp = (choice) => {
    setLoginSignUp(choice);
  }

  //storing SideBar's state
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  }

const sendChangePasswordRequest = (email) => {
  fetch(`https://travelmatebackend.azurewebsites.net/api/v1/auth/resetPassword?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        //mode: 'no-cors'
      }).then(response => response.text())
      .then(result => {
        console.log('test')
      })
      .catch(error => console.log('error', error));
};

  return (
    
    <Router>
      <div className="App">
        <div className='content'>
          <header className="App-header">
            <Routes>
              <Route exact path='/' element={<Login updateLoginOrSignUp={updateLoginOrSignUp} />} />
              <Route exact path='/sign-up' element={<SignUp updateLoginOrSignUp={updateLoginOrSignUp} />} />
              <Route exact path='/home' element={<Home sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} toggleSideBar={toggleSideBar}/>} />
              <Route exact path='/profile' element={<ProfileScreen sendChangePasswordRequest={sendChangePasswordRequest} sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} toggleSideBar={toggleSideBar}/>}/>
              <Route exact path='/create-plan' element={<CreatePlan sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} toggleSideBar={toggleSideBar}/>}/>
              <Route exact path='/trip-details' element={<TripDetails sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} toggleSideBar={toggleSideBar}/>}/>
              <Route exact path='/change-password/:token' element={<ChangePassword sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} toggleSideBar={toggleSideBar}/>}/>
              <Route exact path='/change-password-info' element={<ChangePasswordInfo />} />
              <Route exact path='/friends' element={<FriendsScreen sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} toggleSideBar={toggleSideBar}/>}/>
              <Route exact path='/forgot-password' element={<ForgotPassword sendChangePasswordRequest={sendChangePasswordRequest}/>} />
            </Routes>
          </header>
        </div>
      </div>
    </Router>
  );
}

export default App;
