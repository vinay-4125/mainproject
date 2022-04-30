import React, { useState } from "react";
import UserDeleteModal from "./usermodal/UserDeleteModal";
import UserInfo from "./usermodal/UserInfo";

const Users = ({ user }) => {
  // const details = [
  //   { name: "John Doe1", email: "john1@example.com" },
  //   { name: "Abc Def", email: "abc@example.com" },
  //   { name: "Wer Qwe", email: "wer@example.com" },
  // ];
  const [searchKey, setSearchKey] = useState("");

  const handleDelete = () => {
    console.log("handleDelete");
  };
  const handleEdit = () => {
    console.log("handleEdit");
  };

  return (
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
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Email
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Orders
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
                {user
                  .filter((obj) =>
                    obj.displayName
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(searchKey.toLowerCase().replace(/\s+/g, ""))
                  )
                  .map((item, id) => (
                    <tr key={id} className="text-center">
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-10 h-10 rounded-full"
                              src={item.photoURL}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              {item.displayName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 text-gray-500">
                          {item.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                        <UserInfo item={item} />
                        {/* <button
                        type="button"
                        onClick={handleEdit}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 font-medium rounded text-sm px-5 py-1.5 text-center inline-flex items-center mr-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                          />
                        </svg>
                        &nbsp;
                        User Info
                      </button> */}
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                        <UserDeleteModal item={item} />
                        {/* <button
                        type="button"
                        onClick={handleDelete}
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 font-medium rounded text-sm px-5 py-1.5 text-center inline-flex items-center mr-2"
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

export default Users;
