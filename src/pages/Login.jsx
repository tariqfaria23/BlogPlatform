import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '../../firebase-config'

const Login = ({ setIsAuth, isAuth }) => {

  let navigate = useNavigate();

  const signInWithGoogle = () => {

    signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    console.log(user)
    localStorage.setItem("isAuth", true);
      setIsAuth(true);
      console.log(isAuth)
      navigate("/");
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData?.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorCode,errorMessage)
  });
  };


  return (
    <div className="container">
      <div className="login-page">
        <p>Sign in to continue</p>
        <button className="login-btn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default Login
