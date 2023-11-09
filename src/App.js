import Home from './screens/Home';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  const [loginOrSignUp, setLoginSignUp] = useState("Login");

  //changing site's title
  useEffect(() => {document.title = `TravelMate - ${loginOrSignUp}`}, [loginOrSignUp]);

  const updateLoginOrSignUp = (choice) => {
    setLoginSignUp(choice);
  }

  return (
    <Router>
      <div className="App">
        <div className='content'>
          <header className="App-header">
            <Routes>
              <Route exact path='/' element={<Login updateLoginOrSignUp={updateLoginOrSignUp} />} />
              <Route exact path='/sign-up' element={<SignUp updateLoginOrSignUp={updateLoginOrSignUp} />} />
              <Route exact path='/home' element={<Home />} />
            </Routes>
          </header>
        </div>
      </div>
    </Router>
  );
}

export default App;
