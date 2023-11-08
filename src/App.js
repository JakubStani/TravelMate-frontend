import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useEffect, useState } from 'react';

function App() {

  const [loginOrSignUp, setLoginSignUp] = useState("Login");

  //changing site's title
  useEffect(() => {document.title = `TravelMate - ${loginOrSignUp}`}, [loginOrSignUp]);

  const updateLoginOrSignUp = (choice) => {
    setLoginSignUp(choice);
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          loginOrSignUp==="Login" ? 
          <Login updateLoginOrSignUp={updateLoginOrSignUp} /> :
          <SignUp updateLoginOrSignUp={updateLoginOrSignUp} />
        }
      </header>
    </div>
  );
}

export default App;
