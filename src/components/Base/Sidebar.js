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
        className="sidebar-brand d-flex align-items-center justify-content-center mb-5"
        to="/">
        <img className="sidebar-brand-icon mt-3" src="https://firebasestorage.googleapis.com/v0/b/ecommerce-app-d0b68.appspot.com/o/Company%20logo.png?alt=media&token=6671bc0c-e991-4375-b595-dbc15032f491" style={{width:"140px",height:"140px", marginRight:"-10%", marginLeft:"-30%"}} alt="" />
        <div className="sidebar-brand-text">Panwari</div>
      </Link>
    

      <Link to="/" className={currentTab(history, "/")}>
        {" "}
        <li className="nav-link">
          <i className="fas fa-fw fa-user"></i>
          <span>Users</span>
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
