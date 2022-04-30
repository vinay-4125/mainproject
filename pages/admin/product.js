import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminSection from "../../components/Admin/AdminSection";
import HomeDashboard from "../../components/Admin/HomeDashboard";
import { db } from "../../src/config/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import ProductsList from "../../components/Admin/ProductsList";

const Product = () => {
  const [products, setProducts] = useState([]);

  // const getData = async () => {
  //   try {
  //     const items = await getDocs(collection(db, "products"));
  //     const productsArray = [];
  //     items.forEach((doc) => {
  //       const obj = {
  //         id: doc.id,
  //         ...doc.data(),
  //       };
  //       productsArray.push(obj);
  //     });
  //     setProducts(productsArray);
  //     // console.log(productsArray);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const getData = async () => {
    try {
      onSnapshot(collection(db, "products"), (snapshot) => {
        const productsArray = [];
        snapshot.forEach((doc) => {
          const obj = {
            id: doc.id,
            ...doc.data(),
          };
          productsArray.push(obj);
        });
        setProducts(productsArray);
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
      <AdminSection name="Products" length={products.length} />
      <ProductsList products={products} />
    </>
  );
};

export default Product;
