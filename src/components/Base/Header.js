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
        let number_=0
        querySnapshot.docChanges().forEach((doc) => {
          
          if (
            sessionStorage.getItem("user") &&
            doc.type === "added" &&
            (doc.doc.data().timestamp.toDate().getTime() > lastLoginTime && doc.doc.data().timestamp.toDate().getTime() <currentLoginTime))
            {
            number_+=1
          }
          if (
            sessionStorage.getItem("user") &&
            doc.type === "added" &&
            (doc.doc.data().timestamp.toDate().getTime() > currentLoginTime && doc.doc.data().timestamp.toDate().getTime() >read))
            {
            number_+=1
          }
          if (
            sessionStorage.getItem("user") &&
            doc.type === "added" &&
            (doc.doc.data().timestamp.toDate().getTime() > currentLoginTime && doc.doc.data().timestamp.toDate().getTime() < read))
            {
            
          }
        });
        setNumber(number_)
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
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
