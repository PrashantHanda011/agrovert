import React, { useState, useEffect, useContext } from "react";
import { AppContext, Context } from "./context/Context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products/Products";
import PrivateRoute from "./components/Base/PrivateRoute";
import Orders from "./pages/Orders/Orders"
import Pincodes from "./pages/Pincodes/Pincodes";
import Users from "./pages/Users/Users";

function App() {
  const { appState, getProductsFromBackend, getCategoriesFromBackend } =
    useContext(AppContext);
  
  return (
    <Router>
      <Switch>
        <Route component={Login} path="/login" exact />
        <PrivateRoute component={Users} path="/" exact />
        <PrivateRoute component={Products} path="/products" exact />
        <PrivateRoute component={Orders} path="/orders" exact />
        <PrivateRoute component={Pincodes} path="/pincodes" exact />
      </Switch>
    </Router>
  );
}

export default App;
