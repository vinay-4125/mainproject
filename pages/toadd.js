import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { productAllList } from "../components/medicines";
import UserOrderList from "../components/user/UserOrderList";
import { db } from "../src/config/firebase.config";
import { useUserAuth } from "../src/context/UserAuthContext";

const Toadd = () => {
  const user = useUserAuth();
  const getData = async () => {
    try {
      const items = await getDocs(collection(db, "products"));
      const productsArray = [];
      items.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
      });
      console.log(productsArray);
    } catch (error) {
      console.log(error);
    }
  };

  const addProductsData = () => {
    productAllList.map(async (product) => {
      try {
        await addDoc(collection(db, "products"), product);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const getUserData = async () => {
    // const docRef = doc(db, "users", "NttZ88hxVFXESfj7VWm9");
    // const docSnap = await getDoc(docRef);
    // // const orderRef = doc(db,"orders","cacnodM6NMWELfr1r1A4");
    // const orderSnap = await getDoc(docRef);
    // if (orderSnap.exists()) {
    //   console.log("Document data:", orderSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }

    const userData = {
      name: "abc",
      title: "to insert reference data",
      ordersRef: doc(db, "users", "orders"),
    };
    const docRef = await addDoc(collection(db, "users"), {
      name: "abc",
      title: "to insert reference data",
      orders: doc(db, "orders", "5D6UoIMLUaq6iGaBoTps"),
    });
    console.log("Document written with ID: ", docRef.id);
  };
  const getOrderData = async () => {
    // const docSnap = await getDoc(doc(db, "users","NttZ88hxVFXESfj7VWm9"));
    // if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //     console.log(docSnap.data().orders)
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }

    let orderArray = [];
    const queryOrder = query(collection(db, "users"));
    onSnapshot(queryOrder, (querySnapshot) => {
      querySnapshot.forEach(async (orderDoc) => {
        if (orderDoc.data().orders) {
          const userRef = orderDoc.data().orders;
          getDoc(userRef).then((res) => {
            console.log(res.data());
          });
        }
        orderArray.push(orderDoc.data());
      });
      console.log(orderArray);
    });
  };

  const getOrdersById = async () => {
    const userDetails = user.user;
    const { uid } = userDetails;
    const ordersRef = collection(db, "orders");
    const orderDoc = query(ordersRef, where("uid", "==", `${uid}`));
    const querySnapshot = await getDocs(orderDoc);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let orders = doc.data();
      console.log(orders);
    });
  };

  const getOrderByUserId = async () => {
    const userDetails = user.user;

    const { uid } = userDetails;
    let userDocID;
    const userRef = collection(db, "users");
    const userDoc = query(userRef, where("uid", "==", `${uid}`));
    const querySnapshot = await getDocs(userDoc);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      userDocID = doc.id;
      console.log(userDocID);
    });

    let orderArray = [];
    const queryOrder = query(
      collection(db, "users"),
      where("uid", "==", `${uid}`)
    );
    onSnapshot(queryOrder, (querySnapshot) => {
      querySnapshot.forEach(async (orderDoc) => {
        if (orderDoc.data().orders) {
          const userRef = orderDoc.data().orders;
          getDoc(userRef).then((res) => {
            console.log(res.data());
          });
        }
        orderArray.push(orderDoc.data());
      });
      // console.log(orderArray);
    });
  };

  const getAllCollectionData = async () => {
    const products = await getDocs(collection(db, "orders"))

    const json = JSON.stringify(
      products.docs.map((doc) => ({ ...doc.data() }))
    );
    console.log(json);
  };
<div className="mt-96">

  <UserOrderList/>
</div>

  return (
    <>
      Admin Panel
      <button className="bg-slate-500" onClick={getData}>
        To get all data
      </button>
      <button className="bg-blue-400" onClick={addProductsData}>
        Add data to firestore
      </button>
      <button className="bg-red-400" onClick={getUserData}>
        get user from firestore
      </button>
      <button className="bg-cyan-400" onClick={getOrderData}>
        get order from firestore
      </button>
      <button className="bg-indigo-400" onClick={getOrderByUserId}>
        get order by userid from firestore
      </button>
      <button className="bg-yellow-400" onClick={getOrdersById}>
        get order by id from firestore
      </button>
      <button className="bg-rose-400" onClick={getAllCollectionData}>
        getAllCollectionData
      </button>
    </>
  );
};

export default Toadd;
