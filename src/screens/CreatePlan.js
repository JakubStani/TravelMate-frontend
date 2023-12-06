import React from 'react'
import CreatePlanSheet from '../components/CreatePlanSheet'
import './CreatePlan.css'
import SideBar from '../shared/SideBar'
import NavBar from '../shared/NavBar'

function CreatePlan(props) {
  return (

    <SideBar
      sideBarOpen={props.sideBarOpen}
      setSideBarOpen={props.setSideBarOpen}
      toggleSideBar={props.toggleSideBar}
      content={
        <div className="App">
          <header className="App-header">
            <NavBar toggleSideBar={props.toggleSideBar}/>
            <div className='main-container'>
          <div>
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
  )
}

export default CreatePlan