import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import './Navbar.css';

function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const toggleNav = () => {
        setToggleMenu(!toggleMenu);
    }

   const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    window.location.reload(true);
   }

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    },[])
    return (
        <nav>
            {(toggleMenu || screenWidth > 500) && (
                <ul className="list" onClick={toggleNav}>
                <Link to="/" className="items" > Home Page</Link>
                {localStorage.getItem("accessToken")?<button className="logOut-btn" onClick={logOut}>Log Out <h1>{localStorage.getItem("username")}</h1></button>:""}
            </ul>
            )}
            
            <button className="btn" onClick={toggleNav}>Menu</button>
        </nav>
    )
}

export default Navbar