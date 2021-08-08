import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import React, { useState, useEffect, useContext } from "react";
import { AppContext, Context } from "./context/Context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products/Products";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import { getRefToImageInStorage } from "./utils/utils";

function App() {
  const { appState, getProductsFromBackend, getCategoriesFromBackend } =
    useContext(AppContext);
  useEffect(() => {
    const callBack = async () => {
      await getProductsFromBackend();
      await getCategoriesFromBackend();
      //console.log(getRefToImageInStorage("https://firebasestorage.googleapis.com/v0/b/ecommerce-app-d0b68.appspot.com/o/20210211_122230.jpg?alt=media&token=3b1682fe-7805-45d9-ac27-ce9c19c72bee"))
    };
    callBack();
  }, []);
  console.log(appState);
  return (
    <Router>
      <Switch>
        <Route component={Login} path="/login" exact />
        <Route component={Home} path="/" exact />
        <Route component={Products} path="/products" exact />
      </Switch>
    </Router>
  );
}

export default App;
