import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";




import { query, collection, getDocs, where } from "firebase/firestore";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  // console.log(logInWithEmailAndPassword)

  // const logInWithEmailAndPassword = (email, password) => {
  //   logInWithEmailAndPassword(email, password)
  // }

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
    // console.log(user);
  }, [user, loading]);

  // try to get all data
  // const querySnapshot = await getDocs(collection(db, "users"));
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });

  // console.log(allData)

  // try as a demo 

  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     console.log(data);

  //     setName(data.name);
  //     // if (data.isAdmin == true) {
  //     //   return navigate("/dashboard");
  //     // }
  //     // else {
  //     //   return navigate("/error");
  //     // }
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occured while fetching user data");
  //   }
  // };



  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) return navigate("/dashboard");
  //   // console.log(user);
  //   // console.log(user.email);
  //   // fetchUserName();
  // }, [user, loading])

  // useEffect(() => {
  //   // test start

  //   // const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //   // const doc = getDocs(q);
  //   // const data = doc.docs[0].data();

  //   // test end

  //   if (loading) return;
  //   if (!user) return navigate("/");
  //   // console.log(user);
  //   // console.log(user.email);
  //   fetchUserName();
  // }, [user, loading]);

  // end of demo 

  const logInEmailPass = (() => {
    const login = logInWithEmailAndPassword(email, password)
    console.log(login);
  })


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
          // onClick={() => logInWithEmailAndPassword(email, password)

          // }
          onClick={logInEmailPass}
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
