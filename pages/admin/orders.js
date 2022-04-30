import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminSection from "../../components/Admin/AdminSection";
import OrdersList from "../../components/Admin/orders/OrdersList";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../src/config/firebase.config";

const Orders = () => {
  const [ordersItem, setOrdersItem] = useState([]);
  const getData = async () => {
    try {
      const q = query(collection(db,"orders"),orderBy("timestamp","desc"))
      onSnapshot(q, (snapshot) => {
        let ordersArray = [];
        snapshot.forEach((doc) => {
          const orders = doc.data();
          // console.log(doc.data())
          ordersArray.push(orders);
        });
        setOrdersItem(ordersArray);
      });

      // let ordersArray = [];
      // onSnapshot(collection(db, "orders"), (snapshot) => {
      //   snapshot.forEach((doc) => {
      //     const obj = {
      //       id: doc.id,
      //       ...doc.data(),
      //     };
      //     ordersArray.push(obj);
      //   });
      //   setOrdersItem(ordersArray);
      // });
      console.log(ordersItem)
    } catch (error) {
      console.log(error);
    }
  };

  // const paymentData = () => {
  //   Object.values(ordersItem).map((item, id) => {
  //     // console.log(item.orderObj.paymentMethod);
  //   });
  // };

  // const cartData = () => {
  //   Object.values(ordersItem).map((item, id) => {
  //     // console.log(item.orderObj.cart);
  //   });
  // };
  

  // console.log(ordersItem);
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AdminNavbar current="true" />
      <AdminSection name="Orders" length="null" />
      {/* <OrdersList ordersItem={ordersItem}/> */}
      {/* {Object.keys(ordersItem).map((item, id) => {
        console.log(item);
      })}
      {Object.values(ordersItem).map((item, id) => {
        console.log(item.orderObj.paymentMethod);
      })} */}
      {/* {console.log(paymentData())} */}

      <OrdersList orders={ordersItem}/>
    </>
  );
};

export default Orders;
