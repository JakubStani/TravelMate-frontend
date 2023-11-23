import React, { useState } from 'react'
import Sidebar from 'react-sidebar'
import { Link, useNavigate } from 'react-router-dom';


function SideBar(props) {

    const navigate = useNavigate();

    const sideBarContent = (
        <div>
            <p onClick={()=>{
                navigate('/profile');
                props.toggleSideBar();
                }}>Account</p>
            <p>Friends</p>
            <p>Travel history</p>
            <p>Settings</p>
            <p>Logout</p>
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