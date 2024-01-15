import NavBar from "../shared/NavBar";
import SideBar from "../shared/SideBar";
import SharedPlan from "../components/SharedPlan";
import { List } from "react-virtualized";
import { useEffect, useState } from "react";
import axios from 'axios';
import './Home.css'
import { json, useNavigate } from 'react-router-dom';
import SearchAndList from "../components/SearchAndList";

function Home(props) {

  const navigate = useNavigate();

  const [allowedToRender, setAllowedToRender] = useState(false);

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

  const [sharedPlansData, setSharedPlansData]= useState([]);
  const [messageWhenNoPlansToShow, setMessageWhenNoPlansToShow] = useState('No plans have been shared yet');

  //changing site's title
  document.title = `TravelMate - Home`;

  const [sharedPlansKindToFetch, setSharedPlansKindToFetch] = useState('browse?isCurrent=true')

  const getTripPlansData = () => {
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
          //console.log("result1", result);
          const jsonResult = JSON.parse(result);
          //console.log("result2", jsonResult);
          setSharedPlansData(jsonResult);
          if(jsonResult.length==0) {
            console.log(sharedPlansKindToFetch);
            sharedPlansKindToFetch==='browse?isCurrent=true' ?
                  setMessageWhenNoPlansToShow('No plans have been shared yet')
                  : sharedPlansKindToFetch === 'signed-up?future=true' ?
                  setMessageWhenNoPlansToShow('You have not signed up for any future trip yet')
                  : sharedPlansKindToFetch === 'signed-up?future=false' ?
                  setMessageWhenNoPlansToShow('You have not signed up for any trip yet')
                  : dynamicData.length==0 ?
                  setMessageWhenNoPlansToShow("You do not follow anyone")
                  : setMessageWhenNoPlansToShow("No followed users' plans have been shared yet")
                
          }
          console.log(jsonResult);
          //console.log("trips data 1 ", tripsMockupData);
          //setSharedPlansData(tripsMockupData); //TODO: these are only mockup data. Change them for real data
        })
        .catch(error => console.log('error', error));
  };

  useEffect(() => {
    if (allowedToRender)
    {
      getTripPlansData();
    }

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
  }, [sharedPlansKindToFetch, allowedToRender]);

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
          //console.log("result1", result);
          const jsonResult = JSON.parse(result);
          //console.log("result2", jsonResult);
          navigate('/trip-details', {state: jsonResult});
          //console.log("trips data 1 ", tripsMockupData);
          //setSharedPlansData(tripsMockupData); //TODO: these are only mockup data. Change them for real data
        })
        .catch(error => console.log('error', error));
  };

  //render items in search and list sections

  const clear= (flag) => {
    if(flag==='followed') {
      setSearchedFriend('');
      filterFriendData();
    }
    else {
      setSearchedUser('');
      setUsersData([]);
    }
  };

  const clearFollowed=() => {
    clear('followed');
  };

  const clearUsers=() => {
    clear('searchToFollow');
  };

  const renderUser = ({index, key, style}) => {

    const customStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        borderRadius: "7px",
        color: "white",
        backgroundColor: "#8d00c4",
        ...style
    };

    const isFollowed = followedUsersIdDic.filter(val => val==usersData[index]["id"]).length>0;

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
        {!isFollowed &&
          <div>
            <button onClick={()=> follow(usersData[index]["id"])}>follow</button>
          </div>
        }
        { isFollowed &&
          <div>
            <div>followed</div>
          </div>
        }
    </div>
    );
  };

  const renderFriend = ({index, key, style}) => {

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
                {dynamicData[index]["firstName"]}
            </div>
            <div>
                {dynamicData[index]["email"]}
                
            </div>
        </div>
        <div>
            <button onClick={() => unfollow(dynamicData[index]["id"])}>stop observing</button>
        </div>
    </div>
    );
  };
  //****************************************

  //user data

  const [searchedUser, setSearchedUser] = useState("");
  const [usersData, setUsersData] = useState([]);

  const [searchedFriend, setSearchedFriend] = useState("");
  const [dynamicData, setDynamicData] = useState([]);

  const [followedUsersIdDic, setFollowedUsersIdDic] = useState([]);

  //prepars data for followed users id dic
  const createFromFetchedData = (fetchedFollowedUsersData) =>{
    return fetchedFollowedUsersData.map((foUser) => {
      return {[foUser['id']]: foUser['id']};
    });
  };

  const crFrFD = (fetchedFollowedUsersData) => {
    return fetchedFollowedUsersData.map((foUser) => {
      return foUser['id'];
    });
  }

  const getUserData = () => {
    //console.log("get userdata");
    fetch(`https://travelmatebackend.azurewebsites.net/api/v1/users/search?pattern=${searchedUser}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`

      },
      redirect: 'follow',
    }).then(response => response.text())
    .then(result => {
      //console.log("result1", result);
      const jsonResult = JSON.parse(result);
      //console.log("result2", jsonResult);
      setUsersData([...jsonResult]);
    })
    .catch(error => console.log('error', error));
  };

  const getFollowedData = () => {
    //console.log("get followed data");
    fetch(`https://travelmatebackend.azurewebsites.net/api/v1/users/followed`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`

      },
      redirect: 'follow',
    }).then(response => response.text())
    .then(result => {
      //console.log("result1", result);
      const jsonResult = JSON.parse(result);
      //console.log("result2", jsonResult);
      setDynamicData([...jsonResult]);
      const folUsDic = crFrFD(jsonResult);
      setFollowedUsersIdDic([...folUsDic]);
      console.log('folUsDic', [...folUsDic]);
    })
    .catch(error => console.log('error', error));
  };

  const filterFriendData = () => {
    console.log(dynamicData);
      if(dynamicData.length>0 && searchedFriend!=="") {
        const newData= dynamicData.filter((friend) => {
          return friend['firstname'].toUpperCase().includes(searchedFriend.toUpperCase().trim().replace(/\s/g, ""));
      });

      setDynamicData(newData);
      
      //console.log(newData);
    }
    else {
      if(searchedFriend==='') {
        getFollowedData();
      }
    }
  }

  useEffect(() => {
    //console.log("changes", searchedFriend);
    filterFriendData();
  }, [searchedFriend])

  useEffect(() => {
    //checks whether user is logged in
    //if not, redirects to login page
    if(localStorage.getItem('userToken')!=null)
    {
      getFollowedData();
      setAllowedToRender(true);
    }
    else {
      props.setLoginSignUp('Login');
      navigate('/');
    }
  }, []);
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
    }).then(response => {
      return response.text();
    })
    .then(result => {
      //console.log("result1", result);
      //console.log("result2", jsonResult);
      console.log('i amgetting followed data');

      getFollowedData();
      getUserData();
      //console.log("trips data 1 ", tripsMockupData);
      //setSharedPlansData(tripsMockupData); //TODO: these are only mockup data. Change them for real data
    })
    .catch(error => console.log('error', error));
  };

  //TODO: do not duplicate code
  const unfollow=(userId)=> {
    fetch(`https://travelmatebackend.azurewebsites.net/api/v1/users/unfollow/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`

      },
      redirect: 'follow',
    }).then(response => {
      if(!response.ok) {
        throw new Error();
      }
    
      return response.text();
    })
    .then(result => {
      console.log('unf res', result);
      //console.log("result1", result);
      //console.log("result2", jsonResult);
      getFollowedData();
      //console.log("trips data 1 ", tripsMockupData);
      //setSharedPlansData(tripsMockupData); //TODO: these are only mockup data. Change them for real data
    })
    .catch(error => console.log('error', error));
  };
  //***************

  return (
    <div>
      {allowedToRender &&
        <SideBar
          sideBarOpen={props.sideBarOpen}
          setSideBarOpen={props.setSideBarOpen}
          toggleSideBar={props.toggleSideBar}
          content={
            <div>
              <NavBar toggleSideBar={props.toggleSideBar}/>
              <div className='shared-plans-kinds'>
                <div onClick={()=>setSharedPlansKindToFetch('browse?isCurrent=true')}>All</div>
                <div onClick={()=>setSharedPlansKindToFetch('followed/events')}>Followed</div>
                <div onClick={()=>setSharedPlansKindToFetch('signed-up?future=true')}>Signed Up</div>
                <div onClick={()=>setSharedPlansKindToFetch('signed-up?future=false')}>My trip history</div>
              </div>
              <div className="content-container">
                <div className="observed">
                  <h3>Followed</h3>
                  <div className="search-to-follow">
                    <SearchAndList 
                      getData={filterFriendData}
                      setSearchedUser={setSearchedFriend}
                      searchedUser={searchedFriend}
                      usersData={dynamicData}
                      renderUser={renderFriend}
                      clear={clearFollowed}
                      />
                    </div>
                </div>
                <div className="infinite-scroll-list">
                {/*console.log("trips data 2 ", sharedPlansData)*/}
                {sharedPlansData.length>0 ? 
                  <List
                    width={800}
                    height={700}
                    rowRenderer={renderSharedTripPlan}
                    rowCount={sharedPlansData.length}
                    rowHeight={650}
                    
                
                  />
                  //TODO: fix this to show correct message
                  : messageWhenNoPlansToShow

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
                      clear={clearUsers}
                      />
                    </div>
                </div>
              </div>
            </div>
          }
        />
      }
    </div>
  );
}

export default Home;
