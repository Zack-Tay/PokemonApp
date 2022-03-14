import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import "./navbar.css"

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      <div className="navbar">

        {user ? (
          <div>
            <button className="item" onClick={logoutUser}>Logout</button>
            <span className="item"> | </span>
            <Link className="item" to='/Capture/'>Catch Pokemon</Link>
            <span className="item"> | </span>
            <Link className="item" to='/myPokemon/' >See My Pokemon</Link>
            <span className="item"> | </span>
            <Link className="item" to='/' >See All Pokemon</Link>
          </div>
        ) : (
          <button className="item" to="/login">Login</button>
        )}
      </div>
      <br></br>
    </div>
  );
};

export default Header;
