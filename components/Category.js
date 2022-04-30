import React, { Fragment, useState } from "react";

const Category = () => {
  const [filterType, setFilterType] = useState();

  return (
    <>
      <div className="w-44 mb-5">
        {/* <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Select an option
        </label> */}
        <select
        //   id="productsFilter"
        value={filterType}
        onChange={((e)=>{setFilterType(e.target.value)})}
          className="bg-indigo-100 border border-gray-300 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="" selected>All</option>
          <option value="supplements">Supplements</option>
          <option value="oralhygiene">Oral hygiene</option>
          <option value="cleaningalcohols">Cleaning Alcohols</option>
          <option value="ayurved">Ayurved</option>
        </select>
      </div>
    </>
  );
};

export default Category;

//   <div>
//     <Menu as="div" className="relative inline-block text-left sm:-mx-96 sm:mt-14 mb-5 sm:mb-10">
//       <div className="sm:ml-96">
//         <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-black bg-indigo-900 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
//           Category
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M5 15l7-7 7 7"
//             />
//           </svg>
//         </Menu.Button>
//       </div>
//       <Transition
//         as={Fragment}
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <Menu.Items className="absolute -right-[115px] bottom-11 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//           <div className="px-1 py-1 ">
//             <Menu.Item>
//               {({ active }) => (
//                 <button
//                   className={`${
//                     active ? "bg-indigo-200 text-black" : "text-gray-900"
//                   } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 mr-3"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                     />
//                   </svg>
//                   {/* {active ? (
//                 <EditActiveIcon
//                   className="w-5 h-5 mr-2"
//                   aria-hidden="true"
//                 />
//               ) : (
//                 <EditInactiveIcon
//                   className="w-5 h-5 mr-2"
//                   aria-hidden="true"
//                 />
//               )} */}
//                   Medicine
//                 </button>
//               )}
//             </Menu.Item>
//             <Menu.Item>
//               {({ active }) => (
//                 <button
//                   className={`${
//                     active ? "bg-indigo-200 text-black" : "text-gray-900"
//                   } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
//                 >
//                   {/* {active ? (
//                 <DuplicateActiveIcon
//                   className="w-5 h-5 mr-2"
//                   aria-hidden="true"
//                 />
//               ) : (
//                 <DuplicateInactiveIcon
//                   className="w-5 h-5 mr-2"
//                   aria-hidden="true"
//                 />
//               )} */}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 mr-3"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   Daily Use Products
//                 </button>
//               )}
//             </Menu.Item>
//           </div>
//         </Menu.Items>
//       </Transition>
//     </Menu>
//   </div>
