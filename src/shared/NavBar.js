import { Link } from "react-router-dom";
import './NavBar.css'
import { toggleSideBar } from "./SideBar";

const NavBar = (props) => {
    return (  
        <div className="nav_container">
            <nav className="navbar">
                <div className="routes">
                    <Link to={'/home'}>Logo</Link>
                    <Link to={'/home'}>Shared plans</Link>
                    <Link >Create plan</Link>
                    <Link onClick={()=> props.toggleSideBar()}>Profile Icon</Link>
                </div>
            </nav>
        </div>
    );
};
 
export default NavBar;