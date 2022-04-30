import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../src/context/UserAuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../src/config/firebase.config";
import { useRouter } from "next/router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";

const UserOrderList = () => {
  const [previousOrder, setPreviousOrder] = useState([]);
  const router = useRouter();

  const [data, setData] = useState([]);

  const user = useUserAuth();
  const count = 1;
  let ordersArray = [];
  const getDataPreviousOrder = async () => {
    const userDetails = user.user;
    const { uid } = userDetails;
    const ordersRef = collection(db, "orders");
    const orderDoc = query(ordersRef, where("uid", "==", `${uid}`));
    const querySnapshot = await getDocs(orderDoc);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let orders = doc.data();
      ordersArray.push(orders);
    });
    // console.log(ordersArray)
    setPreviousOrder(ordersArray);
    console.log(ordersArray);
  };
  useEffect(() => {
    getDataPreviousOrder();
    // setData(previousOrder.orderObj.cart.cartItems);
    // console.log(previousOrder);
  }, []);
  // console.log(previousOrder[0]?.orderObj.cart.cartItems);
  return (
    <>
      <div className="flex flex-col mt-8">
  {/* <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"> */}
  <div className="py-2 -my-2 overflow-x-auto">
    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
      {previousOrder.length === 0 ? (
        <>
          <div className="mt-48 sm:mt-32">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-2xl my-auto font-bold">
                Oops! No previous order
              </p>
            </div>
            <div className="mt-6 justify-center text-center text-sm text-gray-500">
              <p>
                <span aria-hidden="true">&larr;</span>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => router.push("/")}
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </>
      ) : (
        <table className="min-w-full">
          {/* <table className=""> */}
          <thead>
            <tr className="self-center">
              <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Customer Name
              </th>
              <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Email
              </th>
              <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Cart Quantity
              </th>
              <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Price
              </th>
              {/* <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Cart Items
                    </th> */}
            </tr>
          </thead>
          <tbody className="bg-white">
            {previousOrder.map((item, id) => (
              <tr key={id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium leading-5 text-center text-gray-900">
                        {item.orderObj.user.displayName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-center text-gray-500">
                    {item.orderObj.user.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-center text-gray-500">
                    {/* {item.orderObj.user.email} */}
                    {item.orderObj.cart.cartTotalQuantity}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-center text-gray-500">
                    {/* {item.orderObj.user.email} */}
                    {item.orderObj.cart.cartTotalAmount + 70}
                  </div>
                </td>
                {/* <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 text-center text-gray-500">
                          <CartOrderInfo item={item} />
                        </div>
                      </td> */}
              </tr>
            ))}
          </tbody>
          {/* <TableContainer className="h-44">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {previousOrder.map((data, id) => {
                  
                  <TableRow key={id}>
                    <TableCell>
                      <Image
                        src={data.orderObj.cart.cartItems[0].url}
                        alt={data.orderObj.cart.cartItems[0].name}
                        width="50"
                        height="50"
                      ></Image>
                    </TableCell>

                    <TableCell>
                      <Typography>
                        {data.orderObj.cart.cartItems[0].name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography>
                        {data.orderObj.cart.cartItems[0].cartQuantity}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography>
                        {data.orderObj.cart.cartItems[0].price}
                      </Typography>
                    </TableCell>
                  </TableRow>;
                  
                })}
              </TableBody>
            </Table>
          </TableContainer> */}
        </table>
      )}
    </div>
  </div>
</div>;

    </>
  );
};

export default UserOrderList;
