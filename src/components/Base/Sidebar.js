import React, { useContext } from "react";
import { AppContext } from "../../context/Context";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../../Firebase";
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
          
          <span class="fa-layers fa-fw">
    <i class="fas fa-fw fa-user"></i>
    <span class="fa-layers-counter"><i className=" fa-layers-counter fas fa-plus" style={{marginLeft:"-5px",fontSize:"10px",marginTop:"-12px", marginRight:"10px"}}></i></span>
  </span>
          <span>Admins</span>
        </li>
      </Link>
      
      <Link to="/products" className={currentTab(history, "/products")}>
        {" "}
        <li className="nav-link">
          <i className="fas fa-fw fa-cog"></i>
          <span>Products</span>
        </li>
      </Link>

      <Link to="/categories" className={currentTab(history, "/categories")}>
        {" "}
        <li className="nav-link">
          <i className="fas fa-fw fa-list-alt"></i>
          <span>Categories</span>
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

      <Link to="/districts" className={currentTab(history, "/districts")}>
        {" "}
        <li className="nav-link">
          <i className="fas fa-fw fa-map-pin"></i>
          <span>Districts</span>
        </li>
      </Link>

      <Link to="/customers" className={currentTab(history, "/customers")}>
        {" "}
        <li className="nav-link">
          <i className="fas fa-fw fa-user"></i>
          <span>Customers</span>
        </li>
      </Link>

      <Link to="/coupons" className={currentTab(history, "/coupons")}>
        {" "}
        <li className="nav-link">
          <i className="fas fa-fw fa-tag fa-lg"></i>
          <span>Coupons</span>
        </li>
      </Link>
      

      <Link to="/login" className={currentTab(history, "/login")} onClick={()=>{
        sessionStorage.removeItem("user");auth.signOut()
        }}>
        {" "}
        <li className="nav-link">
          <i className="fas fa-fw fa-times"></i>
          <span>Logout</span>
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
