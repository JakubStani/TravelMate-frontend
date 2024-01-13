import NavBar from "../shared/NavBar";
import SideBar from "../shared/SideBar";
import SharedPlan from "../components/SharedPlan";
import { List } from "react-virtualized";
import { useEffect, useState } from "react";
import axios from 'axios';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import SearchAndList from "../components/SearchAndList";

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

  const [sharedPlansKindToFetch, setSharedPlansKindToFetch] = useState('browse')

  
  useEffect(() => {
    fetch(`https://travelmatebackend.azurewebsites.net/api/v1/trips/${sharedPlansKindToFetch}`, {
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
  }, [sharedPlansKindToFetch]);

  const renderSharedTripPlan = ({index, key, style}) => (
    <div key={key} style={{marginBlock: '100px'}} onClick={() => showTripsDetails(sharedPlansData[index]['id'])}>
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

  const showTripsDetails = (selectedTripId) => {

    fetch(`https://travelmatebackend.azurewebsites.net/api/v1/trips/details/${selectedTripId}`, {
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
          navigate('/trip-details', {state: jsonResult});
          //console.log("trips data 1 ", tripsMockupData);
          //setSharedPlansData(tripsMockupData); //TODO: these are only mockup data. Change them for real data
        })
        .catch(error => console.log('error', error));
  };

  //render items in search and list sections
  const renderUser = ({index, key, style}) => {

    const customStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        borderRadius: "7px",
        color: "white",
        backgroundColor: "#8d00c4",
        ...style
    };

    return (
        <div key={key} style={customStyle}>
        <div>
            <div>
                {usersData[index]["firstName"]}
            </div>
            <div>
                {usersData[index]["email"]}
            </div>
        </div>
        <div>
            <button onClick={()=> follow(usersData[index]["id"])}>observe</button>
        </div>
    </div>
    );
  };
  //****************************************

  //user data

  const [searchedUser, setSearchedUser] = useState("");
  const [usersData, setUsersData] = useState([]);

  const getUserData = () => {
    console.log("get userdata");
    fetch(`https://travelmatebackend.azurewebsites.net/api/v1/users/search?pattern=${searchedUser}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`

      },
      redirect: 'follow',
    }).then(response => response.text())
    .then(result => {
      console.log("result1", result);
      const jsonResult = JSON.parse(result);
      console.log("result2", jsonResult);
      setUsersData(jsonResult);
    })
    .catch(error => console.log('error', error));
};
  //*********

  //actions on user

  const follow=(userId)=> {
    fetch(`https://travelmatebackend.azurewebsites.net/api/v1/users/follow/${userId}`, {
      method: 'POST',
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
      setUsersData(jsonResult);
      //console.log("trips data 1 ", tripsMockupData);
      //setSharedPlansData(tripsMockupData); //TODO: these are only mockup data. Change them for real data
    })
    .catch(error => console.log('error', error));
  };
  //***************

  return (
    <SideBar
      sideBarOpen={props.sideBarOpen}
      setSideBarOpen={props.setSideBarOpen}
      toggleSideBar={props.toggleSideBar}
      content={
        <div>
          <NavBar toggleSideBar={props.toggleSideBar}/>
          <div className='shared-plans-kinds'>
            <div onClick={()=>setSharedPlansKindToFetch('browse')}>All</div>
            <div onClick={()=>setSharedPlansKindToFetch('browse')}>Observed</div>
            <div onClick={()=>setSharedPlansKindToFetch('signed-up')}>Signed Up</div>
            <div onClick={()=>setSharedPlansKindToFetch('browse')}>My plans</div>
          </div>
          <div className="content-container">
            <div className="observed">
              <h3>Followed</h3>
            </div>
            <div className="infinite-scroll-list">
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
            </div>
            <div className="right-side-column">
              <h3>search to follow</h3>
              <div className="search-to-follow">
                <SearchAndList 
                  getData={getUserData}
                  setSearchedUser={setSearchedUser}
                  searchedUser={searchedUser}
                  usersData={usersData}
                  renderUser={renderUser}
                  />
                </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

export default Home;
