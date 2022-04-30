// import Image from "next/image";
// import React, { useEffect, useMemo, useState } from "react";
// import { useTable } from "react-table";
// import { useSortBy } from "react-table";

// const Userstwo = ({ user }) => {

//     const tableColumn = [
//         {
//             Header : "UserImage",
//             accessor: "https://source.unsplash.com/user/erondu",
//         },
//         {
//             Header : "Name",
//             accessor: "displayName"
//         },
//         {
//             Header : "Email",
//             accessor: "email"
//         },

//     ]
//     const columns = useMemo(()=> tableColumn, [])
//   const data = useMemo(()=> user, [user]);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({ columns, data },useSortBy);

  
  
//   return (
//     <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
//       <thead>
//         {headerGroups.map((headerGroup) => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column) => (
//               <th
//                 {...column.getHeaderProps(column.getSortByToggleProps())}
//                 style={{
//                   borderBottom: "solid 3px red",
//                   background: "aliceblue",
//                   color: "black",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {column.render("Header")}
//                 {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>

//       <tbody {...getTableBodyProps()}>
//         {rows.map((row) => {
//           prepareRow(row);

//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map((cell) => {
//                 return (
//                   <td
//                     {...cell.getCellProps()}
//                     style={{
//                       padding: "10px",

//                       border: "solid 1px gray",

//                       background: "papayawhip",
//                     }}
//                   >
//                     {cell.render("Cell")}
//                   </td>
//                 );
//               })}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// };

// export default Userstwo;
