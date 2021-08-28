import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../../context/Context";
import { auth } from "../../Firebase";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { appState } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        JSON.parse(sessionStorage.getItem("user")) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
