import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import React,{useState} from 'react'
import { Context } from "./Context";
import Form from "./components/Form";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from "./components/Login";


function App() {
  return (
    <Context>
      <Router>
        <Switch>
        <Route component={Login} path="/login" exact/>
        <Route component = {Form} path="/products" exact/>
        </Switch>
      </Router>
    </Context>
  );
}

export default App;
