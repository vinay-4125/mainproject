import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { db } from "../src/config/firebase.config";
import { addToCart } from "../src/features/cartSlice";
import ProductQuickView from "./ProductQuickView";
import Category from "./Category";
import Link from "next/link";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");

  //*** */

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
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        {/*
       <div className="px-32 py-20 rounded-lg grid  gap-10">
        <div className="max-w-xs rounded-md overflow-hidden shadow-lg hover:scale-105 transition duration-500 cursor-pointer">
          <div>
            <Image
              src="https://source.unsplash.com/random"
              alt=""
              height="100"
              width="100"
            />
          </div>
          <div className="py-4 px-4 bg-white">
            <h3 className="text-lg font-semibold text-gray-600">
              Apple MacBook Pro M1 13.3 Silver 16GB/512GB (MYDC2FN/A-16GB)
            </h3>
            <p className="mt-4 text-lg font-thin">$ 2400</p>
          </div>
        </div>
      </div> */}
        {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2 ">
        <div className="w-full px-4 lg:px-0">
          <div className="p-3 bg-white rounded shadow-md hover:scale-105 transition duration-500 cursor-pointer">
            <div className>
              <div className="relative w-full mb-3 h-62 lg:mb-0">
                <Image src="https://source.unsplash.com/random" width="100" height="100" alt="Just a flower" className="object-fill w-full h-full rounded" />
              </div>
              <div className="flex-auto p-2 justify-evenly">
                <div className="flex flex-wrap ">
                  <div className="flex items-center justify-between w-full min-w-0 ">
                    <h2 className="mr-auto text-lg cursor-pointer hover:text-gray-900 ">
                      Fresh butter 100Kg
                    </h2>
                  </div>
                </div>
                <div className="mt-1 text-xl font-semibold">$3.00</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-4 lg:px-0">
          <div className="p-3 bg-white rounded shadow-md">
            <div className>
              <div className="relative w-full mb-3 h-62 lg:mb-0">
                <Image src="https://source.unsplash.com/random" width="100" height="100" alt="Just a flower" className="object-fill w-full h-full rounded" />
              </div>
              <div className="flex-auto p-2 justify-evenly">
                <div className="flex flex-wrap ">
                  <div className="flex items-center justify-between w-full min-w-0 ">
                    <h2 className="mr-auto text-lg cursor-pointer hover:text-gray-900 ">
                      Fresh Tomatoes 500kg
                    </h2>
                  </div>
                </div>
                <div className="mt-1 text-xl font-semibold">$9.00</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-4 lg:px-0">
          <div className="p-3 bg-white rounded shadow-md">
            <div className>
              <div className="relative w-full mb-3 h-62 lg:mb-0">
                <Image src="https://source.unsplash.com/random" width="100" height="100" alt="Just a flower" className="object-fill w-full h-full rounded" />
              </div>
              <div className="flex-auto p-2 justify-evenly">
                <div className="flex flex-wrap ">
                  <div className="flex items-center justify-between w-full min-w-0 ">
                    <h2 className="mr-auto text-lg cursor-pointer hover:text-gray-900 ">
                      Cake 1 plate 120Kg
                    </h2>
                  </div>
                </div>
                <div className="mt-1 text-xl font-semibold">$11.00</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-4 lg:px-0">
          <div className="p-3 bg-white rounded shadow-md">
            <div className>
              <div className="relative w-full mb-3 h-62 lg:mb-0">
                <Image src="https://source.unsplash.com/random" width="100" height="100" alt="Just a flower" className="object-fill w-full h-full rounded" />
              </div>
              <div className="flex-auto p-2 justify-evenly">
                <div className="flex flex-wrap ">
                  <div className="flex items-center justify-between w-full min-w-0 ">
                    <h2 className="mr-auto text-lg cursor-pointer hover:text-gray-900 ">
                      Cake 1 plate 120Kg
                    </h2>
                  </div>
                </div>
                <div className="mt-1 text-xl font-semibold">$11.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
       */}
      </div>

      <div className="text-center">
        <input
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search Here...."
          className="w-72 sm:w-3/6 p-4 rounded focus:outline-none focus:outline-indigo-400 border-0 border-indigo-700 bg-indigo-100"
        />

        {/* bg-[#EDEDED] */}
      </div>

      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          {/* <Category /> */}

          <div className="w-44 mb-5 ml-8 sm:ml-32">
            {/* <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Select an option
        </label> */}
            <select
              //   id="productsFilter"
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
              }}
              defaultValue=""
              className="bg-indigo-100 border border-gray-300 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">All</option>
              <option value="supplements">Supplements</option>
              <option value="oralhygiene">Oral hygiene</option>
              <option value="cleaningalcohols">Cleaning Alcohols</option>
              <option value="ayurved">Ayurved</option>
            </select>
          </div>
          {/* <h2 className="sr-only">Products</h2> */}
          {/* <div className="mt-6 px-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"> */}
          <div className="mt-6 px-8 lg:px-32 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {products
              .filter((obj) =>
                obj.name
                  .toLowerCase()
                  .replace(/\s+/g, "")
                  .includes(searchKey.toLowerCase().replace(/\s+/g, ""))
              )
              .filter((obj) => obj.category.includes(filterType))
              .map((product) => (
                <a key={product.id} href={product.href} className="group">
                  <div className="w-full bg-transparent aspect-w-1 aspect-h-1 hover:scale-105 transition duration-100 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    {/* <Image
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                        // src={product.imageSrc}
                        src={product.url}
                        alt={product.name}
                        width="300"
                        height="150"
                        // width="250"
                        // height="150"
                        draggable="false"
                      /> */}

                    <ProductQuickView product={product} />
                  </div>
                  <div>
                    <div className="flex justify-between">
                    <div>
                      <h3 className="mt-4 text-sm w-44 sm:w-24 md:w-24 lg:w-44 truncate  text-gray-700">
                        {product.name}
                      </h3>
                    </div>
                      <p>
                        {product.quantity ? null : (
                          <span className="inline-flex mt-4 px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </p>
                    </div>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      ₹{product.price}
                    </p>
                  </div>
                  {!product.quantity ? (
                    <div>
                      <button
                        // onClick={() => handleAddToCart(product)}
                        disabled
                        className="w-full py-2 text-center cursor-not-allowed text-white bg-indigo-200 rounded-md shadow hover:bg-indigo-400"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full py-2 text-center text-white bg-indigo-500 rounded-md shadow hover:bg-indigo-400"
                      >
                        Add to Cart
                      </button>
                    </div>
                  )}
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

// export async function getServerSideProps(){
//   const getData = async () => {
//     try {
//       const items = await getDocs(collection(db, "products"));
//       const productsArray = [];
//       items.forEach((doc) => {
//         const obj = {
//           id: doc.id,
//           ...doc.data(),
//         };
//         productsArray.push(obj);
//       });
//       console.log(productsArray);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return{
//     props:{
//       products: productsArray
//     }
//   }
// }
