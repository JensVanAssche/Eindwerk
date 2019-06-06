import React from "react";
import { Link } from "react-router-dom";

import "./navigation.scss";

function Navigation() {
  return (
    <div className="nav">
      <div className="nav-content">
        <Link to="/" className="logo">
          Speechi
        </Link>
        <div className="grow" />
        <div>
          <Link to="/about">Over Ons</Link>
          <Link to="/login-parent">Log In</Link>
          <Link to="/signup">Registreer</Link>
        </div>
      </div>
      <div className="nav-skew-light" />
      <div className="nav-skew-dark" />
    </div>
  );
}

export default Navigation;
