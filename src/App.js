import React, { useState, useEffect, useContext } from "react";
import { AppContext, Context } from "./context/Context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products/Products";
import PrivateRoute from "./components/Base/PrivateRoute";
import Orders from "./pages/Orders/Orders"
import Pincodes from "./pages/Pincodes/Pincodes";
import Users from "./pages/Users/Users";
import Category from "./pages/Categories/Category";
import Customer from "./pages/Customers/Customer";
import Districts from "./pages/Districts/Districts";

function App() {

  return (
    <Router>
      <Switch>
        <Route component={Login} path="/login" exact />
        <PrivateRoute component={Users} path="/" exact />
        <PrivateRoute component={Products} path="/products" exact />
        <PrivateRoute component={Orders} path="/orders" exact />
        <PrivateRoute component={Pincodes} path="/pincodes" exact />
        <PrivateRoute component={Category} path="/categories" exact />
        <PrivateRoute component={Customer} path="/customers" exact />
        <PrivateRoute component={Districts} path="/districts" exact />
      </Switch>
    </Router>
  );
}

export default App;
