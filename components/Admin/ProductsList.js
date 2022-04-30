import { Switch } from "@headlessui/react";
import React, { useState } from "react";
import AddProductModal from "./productmodal/AddProductModal";
import ProductDeleteModal from "./productmodal/ProductDeleteModal";
import ProductModal from "./productmodal/ProductModal";
import StockSwitch from "./productmodal/StockSwitch";

const ProductsList = ({ products }) => {
  const [searchKey, setSearchKey] = useState("");
  const [enabled, setEnabled] = useState(false)
  const [filterType, setFilterType] = useState("");


  const handleDelete = () => {
    console.log("handleDelete");
    // console.log(products)
  };
  const handleEdit = () => {
    console.log("handleEdit");
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-around">
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
        
        
        {/* <div className="flex flex-row-reverse mr-32"> */}
        <div className="relative w-64 mt-4 sm:mt-0 sm:w-96 mr-3 ml-9 sm:block md:mr-0 md:block">
          <AddProductModal />
        </div>
      </div>
      <div className="w-44 mb-5 ml-9 mt-9 sm:ml-9 md:ml-[63px] lg:ml-[263px]">
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
              <option value="medicine">Medicine</option>
              <option value="oralhygiene">Oral hygiene</option>
              <option value="cleaningalcohols">Cleaning Alcohols</option>
              <option value="ayurved">Ayurved</option>
            </select>
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
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Price
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Edit
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {products
                  .filter((obj) => obj.name.toLowerCase().replace(/\s+/g, "").includes(searchKey.toLowerCase().replace(/\s+/g, "")))
                  .filter((obj) => obj.category.includes(filterType))
                  .map((item, id) => (
                    <tr key={id} className="text-center">
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            {item.url && (
                              <img
                                className="w-10 h-10 rounded-full"
                                // src="https://source.unsplash.com/user/erondu"
                                src={item.url}
                                alt={item.name}
                              />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{item.price}</td>


                      <td className=" py-4 whitespace-no-wrap border-b border-gray-200">
                      <StockSwitch id={item.id} quant={item.quantity}/>
                      </td>
                      <td>{item.category}</td>

                      <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                        <ProductModal item={item} />
                        {/* <button
                        type="button"
                        onClick={handleEdit}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center mr-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Edit
                      </button> */}
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                        <ProductDeleteModal item={item} />
                        {/* <button
                        type="button"
                        onClick={handleDelete}
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center mr-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Delete
                      </button> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
