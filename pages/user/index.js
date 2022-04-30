import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useUserAuth } from "../../src/context/UserAuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../src/config/firebase.config";
import UserTab from "../../components/user/UserTab";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserProfile = () => {
  // const [previousOrder, setPreviousOrder] = useState([]);

  // const user = useUserAuth();
  // const count = 1;
  // const getDataPreviousOrder = async () => {
  //   const userDetails = user.user;
  //   const { uid } = userDetails;
  //   const ordersRef = collection(db, "orders");
  //   const orderDoc = query(ordersRef, where("uid", "==", `${uid}`));
  //   const querySnapshot = await getDocs(orderDoc);
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     let orders = doc.data();
  //     setPreviousOrder(orders);
  //     console.log(orders)
  //   });
  // };
  // useEffect(() => {
  //   getDataPreviousOrder();
  //   // console.log(previousOrder);
  // }, [count]);
  // console.log(previousOrder)

  return (
    <>
      <Navbar />
      <div className="mt-28">{""}</div>
      <div className="flex justify-center items-center">
        <UserTab/>
      </div>
    </>
  );
};

export default UserProfile;
