import React, { useEffect, useState } from 'react'
import SideBar from '../shared/SideBar'
import NavBar from '../shared/NavBar'
import './FriendsScreen.css'
import SearchBar from '../shared/SearchBar'
import { List } from 'react-virtualized'

function FriendsScreen(props) {

    const mockupData = [
        {
            id: "1", 
            firstName: "Jan", 
            lastName:"Kowalski",
            email: "jan.kowalski@gmail.com"
        },
        {
            id: "38", 
            firstName: "Aleksandra", 
            lastName:"Kochanowska",
            email: "a.koch@gmail.com"
        },
        {
            id: "15", 
            firstName: "Marek", 
            lastName:"Wigieł",
            email: "jablko345@gmail.com"
        },
        {
            id: "16", 
            firstName: "Mateusz", 
            lastName:"Wigieł",
            email: "jablko345@gmail.com"
        },
        {
            id: "17", 
            firstName: "Mateusz", 
            lastName:"Wigieł",
            email: "jablko345@gmail.com"
        },
        {
            id: "18", 
            firstName: "Mateusz", 
            lastName:"Wigieł",
            email: "jablko345@gmail.com"
        },
        {
            id: "19", 
            firstName: "Mateusz", 
            lastName:"Wigieł",
            email: "jablko345@gmail.com"
        },
        {
            id: "20", 
            firstName: "Mateusz", 
            lastName:"Wigieł",
            email: "jablko345@gmail.com"
        },
    ];

    const [searchedFriend, setSearchedFriend] = useState("");
    const [dynamicData, setDynamicData] = useState(mockupData);

    const [searchedUser, setSearchedUser] = useState("");
    const [usersData, setUsersData] = useState([]);

    const filterFriendData = () => {
        const newData= mockupData.filter((friend) => {
            return friend['firstName'].toUpperCase().includes(searchedFriend.toUpperCase().trim().replace(/\s/g, ""));
        });
        setDynamicData(newData);
        console.log(newData);
    }

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
                <button>stop observing</button>
            </div>
        </div>
        );
    };

    useEffect(() => {
        console.log("changes", searchedFriend);
        filterFriendData();
    }, [searchedFriend])

    // useEffect(() => {
    //     console.log("changes", searchedFriend);
    //     filterUserData();
    // }, [usersData])

    // const filterUserData = () => {
    //     const newData= usersData.filter((user) => {
    //     return user['firstName'].toUpperCase().includes(searchedUser.toUpperCase().trim().replace(/\s/g, ""));
    //     });
    //     setDynamicData(newData);    
    //     console.log(newData);
    // }

    const getUserData = () => {
        console.log("get userdata");
        fetch(`https://travelmatebackend.azurewebsites.net/api/v1/users/search?pattern=${searchedUser}`, {
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
          setUsersData(jsonResult);
          //console.log("trips data 1 ", tripsMockupData);
          //setSharedPlansData(tripsMockupData); //TODO: these are only mockup data. Change them for real data
        })
        .catch(error => console.log('error', error));
    };

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

  return (

    <SideBar
      sideBarOpen={props.sideBarOpen}
      setSideBarOpen={props.setSideBarOpen}
      toggleSideBar={props.toggleSideBar}
      content={
        <div>
          <header>
            <NavBar toggleSideBar={props.toggleSideBar}/>
          </header>
          <div className='friends-title-container'>Friends screen</div>

            <div className='friends-cards-container'>

                <div className='friend-section-container'>
                    <div>My friends</div>
                    <div className='friends-card-data-container'>
                        <div>
                            <SearchBar 
                                search={(event)=> (event.key ==="Enter"? filterFriendData(): null)} //? getData():
                                whenTextChanges={(e)=> {setSearchedFriend(e.target.value);}} //? setSearchedFriend or setSearchedUser
                                searchedFriend={searchedFriend} //searchedFriend or searchedUser
                                />
                            <div>
                                <List
                                    width={window.innerWidth*0.35}
                                    height={window.innerHeight*0.4}
                                    rowCount={dynamicData.length} //dynamicData or usersData
                                    rowHeight={70}
                                    rowRenderer={renderFriend} //renderFriend or renderUser
                                    />
                            </div>
                        </div>
                    </div>
                </div>


                <div className='friend-section-container'>
                    <div>Add friend</div>
                    <div className='friends-card-data-container'>
                    <SearchBar 
                        search={(event)=> (event.key ==="Enter"? getUserData(): null)}
                        whenTextChanges={(e)=> setSearchedUser(e.target.value)}
                        searchedFriend={searchedUser}
                        />

                    <List
                        width={window.innerWidth*0.35}
                        height={window.innerHeight*0.4}
                        rowCount={usersData.length}
                        rowHeight={70}
                        rowRenderer={renderUser}
                        />
                    </div>
                </div>
            </div>
        </div>
      }
    />
  )
}

export default FriendsScreen