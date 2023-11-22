import React, { useState } from 'react'
import Sidebar from 'react-sidebar'
import { useNavigate } from 'react-router-dom';


function SideBar(props) {

    const sideBarContent = (
        <div>
            <p>Account</p>
            <p>Logout</p>
            <p>Settings</p>
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