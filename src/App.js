import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import React,{useState} from 'react'
import { Context } from "./Context";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from "./pages/Login";
import Products from "./pages/Products/Products";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";


function App() {
  return (
    <Context>
      <Router>
        <Switch>
        <Route component={Login} path="/login" exact/>
        <PrivateRoute component = {Home} path="/" exact/>
        <PrivateRoute component = {Products} path="/products" exact/>
        </Switch>
      </Router>
    </Context>
  );
}

export default App;
