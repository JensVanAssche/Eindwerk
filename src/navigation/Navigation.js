import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { selectIsLoggedIn } from "auth/selectors";

import "./navigation.scss";

function Navigation({ isLoggedIn }) {
  return (
    <div className="nav">
      <div className="nav-content">
        <Link to="/" className="logo">
          Speechi
        </Link>
        <div className="grow" />
        <div>
          <Link to="/about">Over Ons</Link>
          {!isLoggedIn && (
            <div class="nav-auth">
              <Link to="/login-parent">Log In</Link>
              <Link to="/signup">Registreer</Link>
            </div>
          )}
          {isLoggedIn && (
            <div class="nav-auth">
              <Link to="/dashboard">Dashboard</Link>
            </div>
          )}
        </div>
      </div>
      <div className="nav-skew-light" />
      <div className="nav-skew-dark" />
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state)
});

export default connect(
  mapStateToProps,
  null
)(Navigation);
