import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  selectParentLoggedIn,
  selectChildLoggedIn,
  selectUser
} from "auth/selectors";
import { logout } from "auth/actions";

import "./home.scss";

function Home({ parentLoggedIn, childLoggedIn, user, logout }) {
  return (
    <div className="home">
      {!parentLoggedIn && !childLoggedIn ? (
        <div>
          <h1>WELKOM BIJ SPEECHI</h1>
          <div className="home-content">
            <div>
              <p>
                Speechi is jouw platform om op een leuke manier stemgeven te
                oefenen.
                <br />
                Als ouder of leerkacht kan je je bovenaan registreren en
                vervolgens een account voor je kind aanmaken.
                <br />
                Je kind kan dan hier inloggen met zijn/haar account of verder
                gaan zonder.
              </p>
            </div>
            <div>
              <Link to="/login-child">Log in als kind</Link>
              <Link to="/games">Ga verder zonder inloggen</Link>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
      {parentLoggedIn && (
        <div>
          <h1>Welkom {user.firstName}!</h1>
          <div className="home-content">
            <div />
            <div>
              <Link to="/dashboard-parent">Ga naar dashboard</Link>
              <Link onClick={logout}>Uitloggen</Link>
            </div>
          </div>
        </div>
      )}
      {childLoggedIn && (
        <div>
          <h1>Welkom {user.firstName}!</h1>
          <div className="home-content">
            <div />
            <div>
              <Link to="/games">Ga naar jouw spelletjes</Link>
              <Link onClick={logout}>Uitloggen</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = {
  logout
};

const mapStateToProps = state => ({
  parentLoggedIn: selectParentLoggedIn(state),
  childLoggedIn: selectChildLoggedIn(state),
  user: selectUser(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
