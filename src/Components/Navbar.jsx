import React from 'react'
import { Link } from "react-router-dom";
import { useHistory, useLocation } from 'react-router';

export const Navbar = () => {
  const History = useHistory();

  const logout = () => {
    localStorage.removeItem('token')
    History.push('/login')
  }

  let location = useLocation();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark  ">
        <div className="container ">
          <Link className="navbar-brand" to="/">Forzup</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">

              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} to="/">Home </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/About' ? "active" : ""}`} to="/About">About</Link>
              </li>
              {!localStorage.getItem('token') ? <div className="d-flex">
                <Link to="/Login"><button className="btn btn-success mx-3" type="button">Log In</button></Link>
                <Link to="/Signup"><button className="btn btn-outline-danger" type="button">Sign Up</button></Link>
              </div> : <button onClick={logout} className="btn btn-success mx-3" type="button">Log Out</button>
              }



            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
