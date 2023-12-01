import NavBar from "../shared/NavBar";
import SideBar from "../shared/SideBar";
import SharedPlan from "../components/SharedPlan";
import { List } from "react-virtualized";
import { useEffect, useState } from "react";
import axios from 'axios';

function Home(props) {

  const endpoint = 'https://travelmatebackend.azurewebsites.net/api/v1/trips/browse';

  // Nagłówki, które chcesz dodać do żądania
const headers = {
  'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
};

  const [sharedPlansData, setSharedPlansData]= useState([]);

  //changing site's title
  document.title = `TravelMate - Home`;

  
  useEffect(() => {
    fetch('https://travelmatebackend.azurewebsites.net/api/v1/trips/browse', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`

          },
          redirect: 'follow',
          //mode: 'no-cors'
        }).then(response => response.text())
        .then(result => {
          console.log("result1", result);
          const jsonResult = JSON.parse(result);
          console.log("result2", jsonResult);
          setSharedPlansData(jsonResult);
        })
        .catch(error => console.log('error', error));

          // axios.get(endpoint, {headers})
          // .then(response => {
          //   // Otrzymaj dane z odpowiedzi
          //   console.log('Response:', response.data);
          //   // Tutaj możesz przetworzyć otrzymane dane
          // })
          // .catch(error => {
          //   // Obsługa błędu
          //   console.error('Error:', error);
          // });
  }, []);


  return (
    <SideBar
      sideBarOpen={props.sideBarOpen}
      setSideBarOpen={props.setSideBarOpen}
      toggleSideBar={props.toggleSideBar}
      content={
        <div className="App">
          <header className="App-header">
            <NavBar toggleSideBar={props.toggleSideBar}/>
            <h1>This is a home screen</h1>
            <SharedPlan/>
          </header>
        </div>
      }
    />
  );
}

export default Home;
