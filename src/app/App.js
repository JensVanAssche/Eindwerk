import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { login, me } from "auth/actions";
import { selectIsLoggedIn, selectLoading } from "auth/selectors";

import NotAuthRoute from "routing/NotAuthRoute";
import AuthRoute from "routing/AuthRoute";

import Navigation from "../navigation/Navigation";
import Home from "../home/Home";
import GameOverview from "../gameOverview/GameOverview";
import GameContainer from "../gameContainer/GameContainer";
import About from "../about/About";
import LoginParent from "../auth/LoginParent";
import LoginChild from "../auth/LoginChild";
import Signup from "../auth/Signup";
import Dashboard from "../dashboard/Dashboard";

import "./app.scss";

class App extends React.Component {
  componentDidMount() {
    this.props.me();
  }

  render() {
    const { isLoggedIn, loading } = this.props;

    if (loading) return <div>loading</div>;

    return (
      <div className="wrapper">
        <Route path="*" component={Navigation} />
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route exact path="/games" component={GameOverview} />
          <Route path="/games/:game" component={GameContainer} />
          <Route path="/about" component={About} />
          <NotAuthRoute
            path={"/login-parent"}
            component={LoginParent}
            isLoggedIn={isLoggedIn}
          />
          <NotAuthRoute
            path={"/login-child"}
            component={LoginChild}
            isLoggedIn={isLoggedIn}
          />
          <NotAuthRoute
            path={"/signup"}
            component={Signup}
            isLoggedIn={isLoggedIn}
          />
          <AuthRoute
            path={"/dashboard"}
            component={Dashboard}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  me,
  login
};

const mapStateToProps = state => ({
  loading: selectLoading(state),
  isLoggedIn: selectIsLoggedIn(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
