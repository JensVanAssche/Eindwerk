import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({
  component: Component,
  parentLoggedIn,
  childLoggedIn,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        !parentLoggedIn && childLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )
      }
    />
  );
}

export default AuthRoute;
