import Home from './screens/Home';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProfileScreen from './screens/ProfileScreen';
import CreatePlan from './screens/CreatePlan';

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

  return (
    <Router>
      <div className="App">
        <div className='content'>
          <header className="App-header">
            <Routes>
              <Route exact path='/' element={<Login updateLoginOrSignUp={updateLoginOrSignUp} />} />
              <Route exact path='/sign-up' element={<SignUp updateLoginOrSignUp={updateLoginOrSignUp} />} />
              <Route exact path='/home' element={<Home sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} toggleSideBar={toggleSideBar}/>} />
              <Route exact path='/profile' element={<ProfileScreen sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} toggleSideBar={toggleSideBar}/>}/>
              <Route exact path='/create-plan' element={<CreatePlan sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} toggleSideBar={toggleSideBar}/>}/>
            </Routes>
          </header>
        </div>
      </div>
    </Router>
  );
}

export default App;
