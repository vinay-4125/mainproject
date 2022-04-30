import React, { useEffect, useState } from "react";
import { auth, db } from "../../src/config/firebase.config";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminSection from "../../components/Admin/AdminSection";
import HomeDashboard from "../../components/Admin/HomeDashboard";
import Users from "../../components/Admin/Users";
import { collection, onSnapshot } from "firebase/firestore";
import Userstwo from "../../components/Admin/usermodal/Userstwo";

const User = () => {
  const [user, setUser] = useState([]);

  const details = [
    // { name: "John Doe1", email: "john1@example.com" },
    // { name: "Abc Def", email: "abc@example.com" },
    // { name: "Wer Qwe", email: "wer@example.com" },
  ];

  const getData = async () => {
    try {
      onSnapshot(collection(db, "users"), (snapshot) => {
        const userArray = [];
        snapshot.forEach((doc) => {
          const obj = {
            id: doc.id,
            ...doc.data(),
          };
          userArray.push(obj);
        });
        setUser(userArray);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* <HomeDashboard/> */}
      <AdminNavbar current="true" />
      <AdminSection name="Users" length="null" details={details} />
      <Users user={user} />
      {/* <Userstwo user={user} /> */}
    </>
  );
};

export default User;
