import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/Context";
import { firestore } from "../../Firebase";
const Header = () => {
  

  const { appState, toggleSideBar } = useContext(AppContext);
  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
          onClick={() => {
            toggleSideBar(appState);
          }}>
          <i className="fa fa-bars"></i>
        </button>
        <ul class="navbar-nav" style={{ marginLeft: "80%" }}>
          <li
            class="nav-item dropdown no-arrow mx-1">
            <div class="nav-link dropdown-toggle" onClick={() => {
              
            
            }}>
              
              
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
