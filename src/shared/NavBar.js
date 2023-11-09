import { Link } from "react-router-dom";
import './NavBar.css'

const NavBar = () => {
    return (  
        <div className="nav_container">
            <nav className="navbar">
                <div className="routes">
                    <Link>Logo</Link>
                    <Link>Shared plans</Link>
                    <Link>Create plan</Link>
                    <Link>Profile Icon</Link>
                </div>
            </nav>
        </div>
    );
}
 
export default NavBar;