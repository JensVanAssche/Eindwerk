import React from "react";
import { Link } from "react-router-dom";

import "./home.scss";

function Home() {
  return (
    <div className="home">
      <h1>WELKOM BIJ SPEECHI</h1>
      <div className="home-content">
        <div>
          <p>
            Speechi is jouw platform om op een leuke manier stemgeven te
            oefenen.
            <br />
            Als ouder of leerkacht kan je je bovenaan registreren en vervolgens
            een account voor je kind aanmaken.
            <br />
            Je kind kan dan hier inloggen met zijn/haar account of verder gaan
            zonder.
          </p>
        </div>
        <div>
          <Link to="/login-child">Log in als kind</Link>
          <Link to="/games">Ga verder zonder inloggen</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
