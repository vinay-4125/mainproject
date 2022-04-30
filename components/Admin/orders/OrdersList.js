import Image from "next/image";
import React, { useState } from "react";

const OrdersList = ({ orders }) => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <>
      <>
        {/* <div className="flex flex-row-reverse mr-32">
        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
          <p className="text-sm font-medium leading-none text-white">
            Add User
          </p>
        </button>
      </div> */}
        <div className="relative w-64 sm:w-96 mr-3 ml-9 sm:block md:mr-0 md:block">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            {/* {details.filter((item) => item.name.toLowerCase().includes(searchKey)).map((item) => (

            ))} */}
            <input
              type="text"
              id="email-adress-icon"
              className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col mt-8">
          {/* <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"> */}
          <div className="py-2 -my-2 overflow-x-auto">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full table-auto">
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
                      Payment Mode
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Price
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Cart Quantity
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {orders
                    .filter((obj) =>
                      obj.orderObj.user.displayName
                        .toLowerCase()
                        .replace(/\s+/g, "")
                        .includes(searchKey.toLowerCase().replace(/\s+/g, ""))
                    )
                    .map((item, id) => (
                      <tr key={id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center text-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-10 h-10 rounded-full"
                                src={item.orderObj.user.photoURL}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {item.orderObj.user.displayName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm text-center leading-5 text-gray-500">
                            {item.orderObj.user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm text-center leading-5 text-gray-500">
                            <Image src={item.orderObj.paymentMethod.image} height="70" width="70"/>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm text-center leading-5 text-gray-500">
                            {/* {item.orderObj.user.email} */}
                            {item.orderObj.totalPrice}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm text-center leading-5 text-gray-500">
                            {item.orderObj.cart.cartItems.length}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default OrdersList;
