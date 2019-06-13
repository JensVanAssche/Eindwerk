import React from "react";
import { Route, Redirect } from "react-router-dom";

function NotAuthRoute({
  component: Component,
  parentLoggedIn,
  childLoggedIn,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        parentLoggedIn || childLoggedIn ? (
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
