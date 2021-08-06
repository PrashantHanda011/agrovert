import React, { useContext, useState } from "react";
import { AppContext } from "../context/Context";
import firebase from "firebase";
import { auth } from "../Firebase";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { appState, addUser } = useContext(AppContext);
  const [number, setnumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const history = useHistory();

  const handleNumber = (e) => {
    setnumber(e.target.value);
  };

  const handleOtp = (e) => {
    setOtp(e.target.value);
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
    setUpRecaptcha();
    let phoneNumber = "+91" + number;
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    auth
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
        toggleOtpShow();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    let otpInput = otp;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        // User signed in successfully.
        // console.log("Result" + result.verificationID);
        let user = result.user;
        console.log(user);
        addUser(user);
        history.push("/products");
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect OTP");
      });
  };

  return (
    <div className="bg-gradient-primary " style={{ height: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div id="recaptcha-container"></div>
          <div className="col-xl-6 col-lg-9 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  {!showOtp && (
                    <div className="col-lg-12">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">
                            Welcome Back!
                          </h1>
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
                            Login
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
    </div>
  );
};

export default Login;
