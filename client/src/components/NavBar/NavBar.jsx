import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <div className="navbar">
        <div className="nav-left">
          <Link to="/">Home</Link>
          <Link to="/profil">Profil</Link>
          <Link to="/rechercher">Rechercher</Link>
          <Link to="/calendar">Calendar</Link>
          <Link to="/fullCalendar">FullCalendar</Link>
          <Link to="/changepassword">Password</Link>
          <Link to="/forum">Forum</Link>
        </div>
        <div className="nav-right">
          <Link to="/admin">Admin</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
    </div>
  );
}

export default NavBar;
