// import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import "./Dashboard.css";
// import { auth, db, logout } from "./firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";

// function Dashboard() {
//   const [user, loading, error] = useAuthState(auth);
//   const [name, setName] = useState("");
//   const navigate = useNavigate();

//   const fetchUserName = async () => {
//     try {
//       const q = query(collection(db, "users"), where("uid", "==", user?.uid));
//       const doc = await getDocs(q);
//       const data = doc.docs[0].data();
//       console.log(data);

//       setName(data.name);
//     } catch (err) {
//       console.error(err);
//       alert("An error occured while fetching user data");
//     }
//   };

//   useEffect(() => {
//     if (loading) return;
//     if (user) return navigate("/");

//     fetchUserName();
//   }, [user, loading]);

//   return (
//     <div className="dashboard">
//       <div className="dashboard__container">
//         Logged in as
//         <div>{name}</div>
//         <div>{user?.email}</div>
//         <button className="dashboard__btn" onClick={logout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db, logout } from "./firebase";
import Pagination from './Pagination';

const Dashboard = () => {
  const [allData, setAllData] = useState([])

  const userData = async () => {
    const q = query(collection(db, "users"), where("isAdmin", "==", false));

    const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    // console.log(data)
    setAllData(data);
  }
  console.log(allData)
  useEffect(() => {
    userData();
  }, [])
  return (
    <div>
      <h1>This is dash board</h1>
      {/* {
        allData.map((val, id) => {
          // console.log(val.id);
          return <>
            <p kay={id}>{val.name}</p>
            <h2>what</h2>
          </>
        })
      } */}

      <Pagination data={allData} />
    </div>
  );
};

export default Dashboard;