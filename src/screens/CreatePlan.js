import React, { useEffect, useState } from 'react'
import CreatePlanSheet from '../components/CreatePlanSheet'
import './CreatePlan.css'
import SideBar from '../shared/SideBar'
import NavBar from '../shared/NavBar'
import { useNavigate } from 'react-router-dom'

function CreatePlan(props) {

  const navigate = useNavigate();

  const [allowedToRender, setAllowedToRender] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('userToken')==null) {
      props.setLoginSignUp('Login');
      navigate('/');
    }
    else {
      setAllowedToRender(true);
    }
  }, []);
  return (
    <div>
      {allowedToRender &&
        <SideBar
          sideBarOpen={props.sideBarOpen}
          setSideBarOpen={props.setSideBarOpen}
          toggleSideBar={props.toggleSideBar}
          content={
            <div>
              <header>
                <NavBar toggleSideBar={props.toggleSideBar}/>
                <div className='main-container'>
                  <div className='header-container'>
                      <h1>Create Plan</h1>
                  </div>
                  <div className='create-plan-sheet-container'>
                      <CreatePlanSheet />
                  </div>
                </div>
              </header>
            </div>
          }
        />
      }
    </div>
  )
}

export default CreatePlan