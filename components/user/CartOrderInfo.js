// import React, { Fragment, useEffect, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";

// const CartOrderInfo = ({ item }) => {
//   let [isOpen, setIsOpen] = useState(false);
//   const [data, setData] = useState([]);
//   // setData(item.orderObj.cart.cartItems);
//   function closeModal() {
//     setIsOpen(false);
//   }

//   function openModal() {
//     setIsOpen(true);
//   }
//   useEffect(() => {
//     setData(item.orderObj.cart.cartItems);
//   }, []);
//   console.log(data);
//   return (
//     <>
//       <button
//         type="button"
//         onClick={openModal}
//         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 font-medium rounded text-sm px-3 py-1.5 text-center inline-flex items-center mr-2"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth="2"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//           />
//         </svg>
//         &nbsp; Cart Items
//       </button>

//       <Transition.Root show={isOpen} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed z-10 inset-0 overflow-y-auto"
//           onClose={closeModal}
//         >
//           <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//             </Transition.Child>

//             {/* This element is to trick the browser into centering the modal contents. */}
//             <span
//               className="hidden sm:inline-block sm:align-middle sm:h-screen"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               enterTo="opacity-100 translate-y-0 sm:scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//               leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             >
//               {/* <div className="w-full rounded-lg relative flex items-center bg-white px-4 pt-14 pb-8  shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"> */}
//               <div className="relative w-full inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//                 <div className="bg-white h-96 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                   <div className="sm:flex sm:items-start">
//                     <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                         />
//                       </svg>
//                     </div>
//                     <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                       <Dialog.Title
//                         as="h3"
//                         className="text-lg leading-6 font-medium text-gray-900"
//                       >
//                         <div className="flex justify-between h-7 items-center">
//                           Cart Info
//                           <button
//                             type="button"
//                             className="-m-2 p-2 text-gray-400 hover:text-gray-500"
//                             onClick={() => setIsOpen(false)}
//                           >
//                             <span className="sr-only">Close panel</span>
//                             {/* <XIcon className="h-6 w-6" aria-hidden="true" /> */}
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-6 w-6"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M6 18L18 6M6 6l12 12"
//                               />
//                             </svg>
//                           </button>
//                         </div>
//                       </Dialog.Title>
//                       <div className="mt-10 -ml-14">
//                         <div className="bg-white shadow sm:rounded-lg">
//                           {/* <div className="px-4 py-5 sm:px-6">
//                             <h3 className="text-lg leading-6 font-medium text-gray-900">
//                               Cart Items
//                             </h3>
//                           </div> */}
//                           <div className="border-t border-gray-200">
//                             <table className="min-w-full table-auto">
//                               <thead>
//                                 <tr className="self-center">
//                                   <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
//                                     Item Name
//                                   </th>
//                                   <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
//                                     Email
//                                   </th>
//                                   <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
//                                     Cart Quantity
//                                   </th>
//                                   <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
//                                     Price
//                                   </th>
//                                   <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
//                                     Cart Items
//                                   </th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {data.map(
//                                   (cartdata, id) => {
//                                     <tr key={id}>
//                                       <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                                         <div className="text-sm leading-2 text-center text-gray-500">
//                                           {cartdata.name}
//                                         </div>
//                                       </td>
//                                       <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                                         <div className="text-sm leading-5 text-center text-gray-500">
//                                           {cartdata.name}
//                                         </div>
//                                       </td>
//                                       <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                                         <div className="text-sm leading-5 text-center text-gray-500">
//                                           {cartdata.name}
//                                         </div>
//                                       </td>
//                                       <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                                         <div className="text-sm leading-5 text-center text-gray-500">
//                                           {cartdata.name}
//                                         </div>
//                                       </td>
//                                       <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                                         <div className="text-sm leading-5 text-center text-gray-500">
//                                           {cartdata.name}
//                                         </div>
//                                       </td>
//                                     </tr>;
//                                   }
//                                 )}
//                               </tbody>
//                             </table>
//                           </div>
//                         </div>

//                         {/* <form action="" method="post">
//                         <div className="flex flex-wrap sm:justify-between">
//                           <div className="mb-6">
//                             <label
//                               htmlFor="name"
//                               className="block mb-2 text-sm font-medium text-gray-900"
//                             >
//                               User Name
//                             </label>
//                             <input
//                               type="text"
//                               id="name"
//                               name="displayName"
//                               value={userInfo.displayName}
//                               onChange={registerInputs}
//                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 "
//                               disabled
//                             />
//                           </div>
//                           <div className="mb-6">
//                             <label
//                               htmlFor="price"
//                               className="block mb-2 text-sm font-medium text-gray-900"
//                             >
//                               User Email
//                             </label>
//                             <input
//                               type="text"
//                               id="email"
//                               name="email"
//                               value={userInfo.email}
//                               onChange={registerInputs}
//                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 "
//                               disabled
//                             />
//                           </div>
//                         </div>
//                       </form> */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition.Root>
//     </>
//   );
// };

// export default CartOrderInfo;
