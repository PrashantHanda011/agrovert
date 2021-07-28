import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Base = ({children}) => {
  return (
    <div>
      <div id="wrapper">
        <Sidebar></Sidebar>
        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
            <Header/>
           {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Base;
