import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import React,{useState} from 'react'
import { Context } from "./Context";

function App() {

  return (
    <Context>
      <div>
      <div id="wrapper">
        <Sidebar></Sidebar>
        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
            <Header/>
          </div>
          <Footer />
        </div>
      </div>
    </div>
    </Context>
  );
}

export default App;
