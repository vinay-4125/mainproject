import React, { useState } from "react";

const AdminSection = ({ name,length, details }) => {

  const [searchKey, setSearchKey] = useState("");


  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-wrap">
          <h1 className="text-3xl font-bold text-gray-900">{name} {length==="null" ? "" :`[${length}]`}</h1>

          <div className="hidden relative w-96 mr-3 ml-9 md:mr-0 md:block">
            {/* <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
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
            <div> */}
            {/* {details.filter((item) => item.name.toLowerCase().includes(searchKey)).map((item) => (

            ))} */}
              {/* <input
                type="text"
                id="email-adress-icon"
                className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search..."
                value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
              />
            {/* </div> */}
          </div> 
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          {/* <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div> */}
          {/* /End replace */}
        </div>
      </main>
    </>
  );
};

export default AdminSection;
