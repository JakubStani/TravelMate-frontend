import { Link } from "react-router-dom";
import './NavBar.css'
import { toggleSideBar } from "./SideBar";

const NavBar = (props) => {
    return (  
        <header className="navbar">
            <nav className="nav_container">
                <div className="routes">
                    <a href="/home">Logo</a>
                    <a href="/home">Shared plans</a>
                    <a href="/create-plan">Create plan</a>
                    <a onClick={()=> props.toggleSideBar()}>Profile Icon</a>

                </div>
            </nav>
        </header>
    );
};
 
export default NavBar;


// <div className="nav_container">
        //     <nav className="navbar">
        //         <div className="routes">
        //             <Link to={'/home'}>Logo</Link>
        //             <Link to={'/home'}>Shared plans</Link>
        //             <Link to={'/create-plan'}>Create plan</Link>
        //             <Link onClick={()=> props.toggleSideBar()}>Profile Icon</Link>
        //         </div>
        //     </nav>
        // </div>