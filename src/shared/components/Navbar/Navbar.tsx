import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from "../../../assets/logo-white.png";

export const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/discography">Discography</NavLink></li>
                <li><NavLink to="/news">News</NavLink></li>
                <li className="logo">
                    <NavLink to="/">
                        <img src={logo} alt="G-Dragon logo" />
                    </NavLink>
                </li>
                <li><NavLink to="/fashion">Fashion</NavLink></li>
                <li><NavLink to="/pmoArchive">Peaceminusone Archive</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;