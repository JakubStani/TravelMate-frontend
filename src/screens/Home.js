import NavBar from "../shared/NavBar";
import SideBar from "../shared/SideBar";
import SharedPlan from "../components/SharedPlan";

function Home(props) {

  //changing site's title
  document.title = `TravelMate - Home`;

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
