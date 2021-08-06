import React, { useContext } from "react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { AppContext } from "../context/Context";

const Base = ({ children }) => {
  return (
    <div>
      <div id="wrapper">
        <Sidebar></Sidebar>
        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
            <Header />
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Base;
