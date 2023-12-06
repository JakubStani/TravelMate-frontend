import NavBar from "../shared/NavBar";
import SideBar from "../shared/SideBar";
import SharedPlan from "../components/SharedPlan";
import { List } from "react-virtualized";
import { useEffect, useState } from "react";
import axios from 'axios';
import './Home.css'
import { useNavigate } from 'react-router-dom';

function Home(props) {

  const navigate = useNavigate();

  const tripsMockupData = [
    {
      "id": 1,
      "userInfo": "Jakub S",
      "userTotalTrips": 1,
      "title": "Trzy korony w zimie",
      "destination": "Trzy korony, Polska",
      "startDate": "2023-12-20",
      "endDate": "2023-12-20",
      "estimatedPrice": "100",
      "pointOfStart": "Wrocław, Polska"
    }
  ];

  const endpoint = 'https://travelmatebackend.azurewebsites.net/api/v1/trips/browse';

  // Nagłówki, które chcesz dodać do żądania
  const headers = {
    'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
  };

  const [sharedPlansData, setSharedPlansData]= useState();

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
          console.log("trips data 1 ", tripsMockupData);
          //setSharedPlansData(tripsMockupData); //TODO: these are only mockup data. Change them for real data
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

  const renderSharedTripPlan = ({index, key, style}) => (
    <div key={key} style={{marginBlock: '100px'}} onClick={() => showTripsDetails(sharedPlansData[index])}>
      <SharedPlan
                userData={sharedPlansData[index]['userInfo']}
                title={sharedPlansData[index]['title']}
                estimatedPrice={sharedPlansData[index]['estimatedPrice']}
                startDate={sharedPlansData[index]['startDate']}
                endDate={sharedPlansData[index]['endDate']}
                destination={sharedPlansData[index]['destination']}
                
              />
    </div>
  );

  const showTripsDetails = (selectedTrip) => {
    navigate('/trip-details', {state: selectedTrip});
  };

  return (
    <SideBar
      sideBarOpen={props.sideBarOpen}
      setSideBarOpen={props.setSideBarOpen}
      toggleSideBar={props.toggleSideBar}
      content={
        <div className="App">
          <header className="App-header">
            <NavBar toggleSideBar={props.toggleSideBar}/>
            {console.log("trips data 2 ", sharedPlansData)}
            {sharedPlansData && 
              <List
                width={800}
                height={700}
                rowRenderer={renderSharedTripPlan}
                rowCount={sharedPlansData.length}
                rowHeight={650}
                
            
              />
            }
          </header>
        </div>
      }
    />
  );
}

export default Home;
