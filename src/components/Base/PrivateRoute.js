import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../../context/Context";
import { auth } from "../../Firebase";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const sessUser = JSON.parse(sessionStorage.getItem("user"))
  const firebaseSessUser = JSON.parse(sessionStorage.getItem(`firebase:authUser:${process.env.REACT_APP_apiKey}:[DEFAULT]`))
  return (
    <Route
      {...rest}
      render={(props) =>
        sessUser ? (
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
