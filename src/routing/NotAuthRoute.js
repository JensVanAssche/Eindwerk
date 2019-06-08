import React from "react";
import { Route, Redirect } from "react-router-dom";

function NotAuthRoute({ component: Component, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Redirect
            to={{
              pathname: "/dashboard"
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default NotAuthRoute;
