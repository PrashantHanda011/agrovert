import React, { useContext } from "react";
import { AppContext } from "../Context";

const Sidebar = () => {
  const { appState, toggleSideBar } = useContext(AppContext);
  return (
    <ul
      className={
        !appState.toggle
          ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion d-flex align-items-center"
          : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      }
      id="accordionSidebar">
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html">
        <div className="sidebar-brand-icon rotate-n-15"></div>
        <div className="sidebar-brand-text mx-3">Admin Panel</div>
      </a>
      <hr className=""/>

      <li className="nav-item active">
        <a className="nav-link" href="index.html">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          href="#"
          aria-expanded="true"
          aria-controls="collapseTwo">
          <i className="fas fa-fw fa-cog"></i>
          <span>Products</span>
        </a>
      </li>

      <li className="nav-item">
        <a
          className="nav-link"
          href="#"
          aria-expanded="true"
          aria-controls="collapsePages">
          <i className="fas fa-fw fa-folder"></i>
          <span>Orders</span>
        </a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="charts.html">
          <i className="fas fa-fw fa-user"></i>
          <span>Profile</span>
        </a>
      </li>

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

export default Sidebar;
