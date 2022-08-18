import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { auth, logInWithEmailAndPassword, signInWithGoogle, db } from "./firebase";
import { auth, signInWithGoogle, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";


import { query, collection, getDocs, where, doc, getDoc } from "firebase/firestore";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [name, setName] = useState("");



  // useEffect(() => {
  //   if (loading) {
  //     // maybe trigger a loading screen
  //     return;
  //   }
  //   if (user) navigate("/dashboard");
  //   // console.log(user);
  // }, [user, loading]);


  // demo


  // sign in




  // login

  const logInWithEmailAndPassword = async (email, password) => {
    // const navigate = useNavigate();
    try {
      let response = await signInWithEmailAndPassword(auth, email, password);
      let docRef = doc(db, "users", response.user.uid);
      // let doc = await collectionRef.doc();
      let querySnapshot = await getDoc(docRef);
      if (querySnapshot.exists()) {
        // console.log(querySnapshot.data());3
        // console.log(querySnapshot.data());
        const loginData = querySnapshot.data()
        console.log(typeof (loginData))
        console.log(loginData.isAdmin)
        if (loginData.isAdmin) {
          navigate("/dashboard")
        }
        else {
          navigate("/error")
        }
      }
      // console.log(querySnapshot);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }


  };
  // end demo




  // const logInEmailPass = (() => {
  //   const login = logInWithEmailAndPassword(email, password)
  //   console.log(login);
  // })


  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)

          }
        // onClick={logInEmailPass}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;
