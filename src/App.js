import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import React,{useState,useEffect,useContext} from 'react'
import { AppContext, Context } from "./Context";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from "./pages/Login";
import Products from "./pages/Products/Products";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";





function App() {
  const {appState,getProductsFromBackend,getCategoriesFromBackend} = useContext(AppContext)
  useEffect(()=>{
    const callBack = async () =>{
      await getProductsFromBackend()
      await getCategoriesFromBackend()
    }
    callBack()
  },[])
  console.log(appState)
  return (
      <Router>
        <Switch>
        <Route component={Login} path="/login" exact/>
        <Route component = {Home} path="/" exact/>
        <Route component = {Products} path="/products" exact/>
        </Switch>
      </Router>
  );
}

export default App;
