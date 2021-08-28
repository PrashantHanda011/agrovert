import React, { useContext, useState } from "react";
import { AppContext } from "../context/Context";
import firebase from "firebase";
import { auth, firestore } from "../Firebase";
import { useHistory } from "react-router-dom";
import Loading from "../components/Base/Loading";


const Login = () => {
  const { appState, addUser } = useContext(AppContext);
  const [number, setnumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage,setErrorMessage] = useState("")
  const [loading,setLoading] = useState(false)
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
    firestore.collection("admins").where("number","==",number).get().then(snapshot=>{
      console.log(snapshot)
      if(snapshot.docs.length>=1){
        setLoading(true)
        setUpRecaptcha();
      let phoneNumber = "+91" + number;
      let appVerifier = window.recaptchaVerifier;
      auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        return auth
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            // console.log(confirmationResult);
            console.log("OTP is sent");
            setLoading(false)
            toggleOtpShow();
          })
          .catch(function (error) {
            console.log(error);
            setLoading(false)
            setError(true)
            if(error.message.includes("reCAPTCHA")){
              setErrorMessage(error.message+ ". Please Reload Page")
            }
            else{
              setErrorMessage(error.message)
            }
            
          });
      });
      }else{
        setError(true)
        const number_ = number
        setErrorMessage(`User with number ${number} doesn't exists`)
      }
    })
    
      
    
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    setLoading(true)
    let otpInput = otp;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        setLoading(false)
        // User signed in successfully.
        // console.log("Result" + result.verificationID);
        let user = result.user;
        console.log(user);
        addUser(user);
        sessionStorage.setItem("user", JSON.stringify(auth.currentUser));
        history.push("/");
      })
      .catch(function (error) {
        setLoading(false)
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

                  {error && (
                    <div className="alert alert-danger alert-dismissible">
                    <div  className="close" data-dismiss="alert" aria-label="close" onClick={()=>{setError(false)}}>&times;</div>
                    <strong>Error!</strong> {errorMessage}
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading && <Loading color="warning"/>}
      </div>
    </div>
  );
};

export default Login;
