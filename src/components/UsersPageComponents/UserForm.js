import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Loading from "../Base/Loading";
import { auth,firestore } from "../../Firebase";
import firebase from "firebase";
import { makeAdminFirestore } from "../../utils/utils";

const UserForm = ({ show, handleClose, admins, updateAdmins }) => {
  const [number, setnumber] = useState("");
  const [name, setName] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleNumber = (e) => {
    setnumber(e.target.value);
  };

  const handleOtp = (e) => {
    setOtp(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const toggleOtpShow = () => {
    setShowOtp(true);
  };

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    setUpRecaptcha();
    let phoneNumber = "+91" + number;
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    auth
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        console.log("OTP is sent");
        setLoading(false)
        toggleOtpShow();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    setLoading(true)
    let otpInput = otp;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
    optConfirm
      .confirm(otpInput)
      .then(async function (result) {
        let user = result.user;
        const doc = await firestore.collection("admins").doc(user.uid)
        if (result.additionalUserInfo.isNewUser||!doc.exists) {
          await makeAdminFirestore(user.uid, name, number);
        }
        setLoading(false)
        const id = user.uid
        updateAdmins([...admins,{id,name,number,type:"ADMIN"}])
        handleClose()
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect OTP");
      });
  };
  const makeForm = () => {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div id="recaptcha-container"></div>
          <div className="col-xl-12 col-lg-9 col-md-9">
            <div className="card o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="row">
                  {!showOtp && (
                    <div className="col-lg-12">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">
                            Add Admin Info
                          </h1>
                        </div>

                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            placeholder="Enter Name"
                            value={name}
                            onChange={handleName}
                          />
                        </div>
                        <div className="user">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
                              placeholder="Enter Phone Number"
                              value={number}
                              onChange={handleNumber}
                            />
                          </div>

                          <button
                            className="btn btn-primary btn-user btn-block"
                            onClick={onSignInSubmit}>
                            Add Admin
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {showOtp && (
                    <div className="col-lg-12">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">Verify</h1>
                        </div>
                        <div className="user">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
                              placeholder="Enter OTP"
                              value={otp}
                              onChange={handleOtp}
                            />
                          </div>

                          <a
                            href="index.html"
                            className="btn btn-primary btn-user btn-block"
                            onClick={onSubmitOtp}>
                            Verify
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>{makeForm()}</Modal.Body>
      </Modal>
      {loading && <Loading />}
    </>
  );
};

export default UserForm;
