import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { me } from "auth/actions";
import {
  selectParentLoggedIn,
  selectChildLoggedIn,
  selectLoading
} from "auth/selectors";

import NotAuthRoute from "routing/NotAuthRoute";
import ParentAuthRoute from "routing/ParentAuthRoute";
import ChildAuthRoute from "routing/ChildAuthRoute";

import Navigation from "../navigation/Navigation";
import Home from "../home/Home";
import GameOverview from "../gameOverview/GameOverview";
import GameContainer from "../gameContainer/GameContainer";
import About from "../about/About";
import LoginParent from "../auth/LoginParent";
import LoginChild from "../auth/LoginChild";
import Signup from "../auth/Signup";
import DashboardParent from "../dashboard/DashboardParent";
import DashboardChild from "../dashboard/DashboardChild";
import AddChild from "../addChild/AddChild";

import "./app.scss";

class App extends React.Component {
  componentDidMount() {
    this.props.me();
  }

  render() {
    const { parentLoggedIn, childLoggedIn, loading } = this.props;

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
            parentLoggedIn={parentLoggedIn}
            childLoggedIn={childLoggedIn}
          />
          <NotAuthRoute
            path={"/login-child"}
            component={LoginChild}
            parentLoggedIn={parentLoggedIn}
            childLoggedIn={childLoggedIn}
          />
          <NotAuthRoute
            path={"/signup"}
            component={Signup}
            parentLoggedIn={parentLoggedIn}
            childLoggedIn={childLoggedIn}
          />
          <ParentAuthRoute
            exact
            path={"/dashboard-parent"}
            component={DashboardParent}
            parentLoggedIn={parentLoggedIn}
            childLoggedIn={childLoggedIn}
          />
          <ParentAuthRoute
            path={"/dashboard-parent/addchild"}
            component={AddChild}
            parentLoggedIn={parentLoggedIn}
            childLoggedIn={childLoggedIn}
          />
          <ChildAuthRoute
            exact
            path={"/dashboard-child"}
            component={DashboardChild}
            parentLoggedIn={parentLoggedIn}
            childLoggedIn={childLoggedIn}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  me
};

const mapStateToProps = state => ({
  loading: selectLoading(state),
  parentLoggedIn: selectParentLoggedIn(state),
  childLoggedIn: selectChildLoggedIn(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
