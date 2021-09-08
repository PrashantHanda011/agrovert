import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/Context";
import { firestore } from "../../Firebase";
const Header = () => {
  const [number, setNumber] = useState(0);
  const [read, setRead] = useState(null);
  const currentLogin = JSON.parse(localStorage.getItem("currentLogin"));
  const lastLogin = JSON.parse(localStorage.getItem("lastLogin"));
  const currentLoginTime = new Date(currentLogin.time);
  const lastLoginTime = new Date(lastLogin.time);
  useEffect(() => {
    firestore
      .collection("orders")
      .orderBy("timestamp", "desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((doc) => {
          if (
            sessionStorage.getItem("user") &&
            doc.type === "added" &&
            (doc.doc.data().timestamp.toDate().getTime() > lastLoginTime ||
              doc.doc.data().timestamp.toDate().getTime() > currentLoginTime)
              // &&(read!==null&& doc.doc.data().timestamp.toDate().getTime() > read.getTime())
          ) {
            setNumber(number + 1);
          }
        });
      });
  }, []);
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
              setNumber(0);
              setRead(new Date())
            }}>
              <i class="fas fa-bell fa-2x fa-fw"></i>
              <span
                class="badge badge-danger badge-counter"
                style={{ top: "26px", left: "17px", fontSize: "14px" }}>
                {number}
              </span>
            </div>
            {/* <div
              class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="alertsDropdown">
              <h6 class="dropdown-header">Alerts Center</h6>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="mr-3">
                  <div class="icon-circle bg-primary">
                    <i class="fas fa-file-alt text-white"></i>
                  </div>
                </div>
                <div>
                  <div class="small text-gray-500">December 12, 2019</div>
                  <span class="font-weight-bold">
                    A new monthly report is ready to download!
                  </span>
                </div>
              </a>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="mr-3">
                  <div class="icon-circle bg-success">
                    <i class="fas fa-donate text-white"></i>
                  </div>
                </div>
                <div>
                  <div class="small text-gray-500">December 7, 2019</div>
                  $290.29 has been deposited into your account!
                </div>
              </a>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="mr-3">
                  <div class="icon-circle bg-warning">
                    <i class="fas fa-exclamation-triangle text-white"></i>
                  </div>
                </div>
                <div>
                  <div class="small text-gray-500">December 2, 2019</div>
                  Spending Alert: We've noticed unusually high spending for your
                  account.
                </div>
              </a>
              <a class="dropdown-item text-center small text-gray-500" href="#">
                Show All Alerts
              </a>
            </div> */}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
