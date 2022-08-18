import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
  getDoc
} from "firebase/firestore";


//using navigation
import { Link, useNavigate } from "react-router-dom";
// const navigate = useNavigate();

const firebaseConfig = {
  apiKey: "AIzaSyCVbH3s0_byloD9vtYK0HwfyggdoneEGqA",
  authDomain: "test-project-70a3d.firebaseapp.com",
  projectId: "test-project-70a3d",
  storageBucket: "test-project-70a3d.appspot.com",
  messagingSenderId: "556424654873",
  appId: "1:556424654873:web:9cdbf28c25fbb3bd157a88",
  measurementId: "G-2D7Y1J0NZP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// working on that's part


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
      // if (loginData.isAdmin = true) {
      //   navigate("/dashboard")
      // }
    }
    // console.log(querySnapshot);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }


};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    // await addDoc(collection(db, "users"), {
    //   uid: user.uid,
    //   name,

    //   authProvider: "local",
    //   email,
    //   isAdmin: false
    // });

    // await db.collection("users").doc("LA").set({
    //   uid: user.uid,
    //   name,
    //   authProvider: "local",
    //   email,
    //   isAdmin: false
    // })

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      isAdmin: false
    });

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
