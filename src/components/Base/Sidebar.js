import React, { useContext } from "react";
import { AppContext } from "../../context/Context";
import { Link, withRouter } from "react-router-dom";
const Sidebar = ({ history }) => {
  const { appState, toggleSideBar } = useContext(AppContext);

  const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return "nav-item active";
    } else {
      return "nav-item";
    }
  };
  return (
    <ul
      className={
        !appState.toggle
          ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion d-flex align-items-center"
          : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      }
      id="accordionSidebar">
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/">
        <div className="sidebar-brand-icon rotate-n-15"></div>
        <div className="sidebar-brand-text mx-3">Admin Panel</div>
      </Link>
      <hr className="" />

      <Link to="/" className={currentTab(history, "/")}>
        <li className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </li>
      </Link>
      <Link to="/products" className={currentTab(history, "/products")}>
        {" "}
        <li className="nav-link">
          <i className="fas fa-fw fa-cog"></i>
          <span>Products</span>
        </li>
      </Link>
      <Link to="/orders" className={currentTab(history, "/orders")}>
        {" "}
        <li className="nav-link">
          <i className="fas fa-fw fa-folder"></i>
          <span>Orders</span>
        </li>
      </Link>

      <Link to="/pincodes" className={currentTab(history, "/pincodes")}>
        {" "}
        <li className="nav-link">
          <i className="fas fa-fw fa-map-pin"></i>
          <span>Pincodes</span>
        </li>
      </Link>

      <Link to="/profile" className={currentTab(history, "/profile")}>
        {" "}
        <li className="nav-link">
          <i className="fas fa-fw fa-user"></i>
          <span>Profile</span>
        </li>
      </Link>

      <div className="text-center d-none d-md-inline">
        <button
          className="rounded-circle border-0"
          id="sidebarToggle"
          onClick={() => {
            toggleSideBar(appState);
          }}></button>
      </div>
    </ul>
  );
};

export default withRouter(Sidebar);
