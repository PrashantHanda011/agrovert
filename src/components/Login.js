import React,{useEffect} from 'react'
import * as firebaseui from 'firebaseui'
import firebase from 'firebase'
import { auth } from '../Firebase'
const Login = () => {
  useEffect(() => {

    const uiconfig = {
      signInSuccessUrl: "/products", //This URL is used to return to that page when we got success response for phone authentication.
      signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
      tosUrl: "/products"}

      var ui = new firebaseui.auth.AuthUI(auth);
      ui.start("#firebaseui-auth-container", uiconfig);

  }, [])
  return (
    <div>
      <div id="firebaseui-auth-container"></div>
    </div>
  )
}

export default Login
