import React, { useContext } from "react";
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
        <div align="center" className="text-center"><strong>Welcome {appState.user.name}</strong></div>
      </nav>
     
    </div>
  );
};

export default Header;
