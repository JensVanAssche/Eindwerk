import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  selectParentLoggedIn,
  selectChildLoggedIn,
  selectUser
} from "auth/selectors";

import logo from "assets/logo.png";

import "./navigation.scss";

function Navigation({ parentLoggedIn, childLoggedIn, user }) {
  return (
    <div className="nav">
      <div className="nav-content">
        <Link to="/" className="logo">
          <img src={logo} alt="" />
        </Link>
        <div className="grow" />
        <div>
          <Link to="/games">SPELLETJES</Link>
          {!parentLoggedIn && !childLoggedIn ? (
            <div className="nav-auth">
              <Link to="/login-parent">Log In</Link>
              <Link to="/signup">Registreer</Link>
            </div>
          ) : (
            <div className="nav-auth" />
          )}
          {parentLoggedIn && (
            <div className="nav-auth">
              <Link to="/dashboard">{user.firstName}</Link>
            </div>
          )}
          {childLoggedIn && (
            <div className="nav-auth">
              <Link to="/games">{user.firstName}</Link>
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
  parentLoggedIn: selectParentLoggedIn(state),
  childLoggedIn: selectChildLoggedIn(state),
  user: selectUser(state)
});

export default connect(
  mapStateToProps,
  null
)(Navigation);
