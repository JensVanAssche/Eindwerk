import React from "react";
import { Route } from "react-router-dom";

import Navigation from "../navigation/Navigation";
import Home from "../home/Home";
import GameOverview from "../gameOverview/GameOverview";
import GameContainer from "../gameContainer/GameContainer";
import About from "../about/About";
import LoginParent from "../auth/LoginParent";
import LoginChild from "../auth/LoginChild";
import Signup from "../auth/Signup";

import "./app.scss";

function App() {
  return (
    <div className="wrapper">
      <Route path="*" component={Navigation} />
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route exact path="/games" component={GameOverview} />
        <Route
          exact
          path="/games/:game"
          component={GameContainer}
        />
        <Route exact path="/about" component={About} />
        <Route exact path="/login-parent" component={LoginParent} />
        <Route exact path="/login-child" component={LoginChild} />
        <Route exact path="/signup" component={Signup} />
      </div>
    </div>
  );
}

export default App;
