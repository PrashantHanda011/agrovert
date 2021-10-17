import React, { useContext } from "react";
import { useEffect } from "react";
import Footer from "../components/Base/Footer";
import Header from "../components/Base/Header";
import Sidebar from "../components/Base/Sidebar";
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
