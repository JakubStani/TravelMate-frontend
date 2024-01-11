import React, { useState } from 'react'
import Sidebar from 'react-sidebar'
import { Link, useNavigate } from 'react-router-dom';


function SideBar(props) {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    const sideBarContent = (
        <div>
            <p onClick={()=>{
                navigate('/profile');
                props.toggleSideBar();
                }}>Account</p>
            <a href="/friends">Friends</a>
            <p>Travel history</p>
            <p>Settings</p>
            <p onClick={() => logout()}>Logout</p>
            <p onClick={()=> props.toggleSideBar()}>X</p>
        </div>
    )
  return (
    <Sidebar
        sidebar={sideBarContent}
        open={props.sideBarOpen}
        pullRight
        onSetOpen={props.setSideBarOpen}
        styles={{sidebar: {background: 'black'}}}
        sidebarClassName="custom-sidebar"
    >
        {props.content}
    </Sidebar>
  );
};

export default SideBar;