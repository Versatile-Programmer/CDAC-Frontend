// // src/components/Table.jsx
// import React from "react";

// function Table({
//   columns = [],
//   data = [],
//   theme = {},
//   emptyMessage = "No data available.",
//   maxHeight = "max-h-[60vh]",
// }) {
//   // Added maxHeight prop with default
//   const headerBg = theme.headerBg || "bg-gray-100";
//   const headerText = theme.headerText || "text-gray-700";
//   const rowBg = theme.rowBg || "bg-gray-50";
//   const border = theme.border || "border-gray-300";

//   return (
//     // Outer container for shadow, border, and rounded corners
//     <div className={`shadow border-b ${border} rounded-lg overflow-hidden`}>
//       {/* Scrollable container with max height */}
//       <div className={`overflow-y-auto relative ${maxHeight}`}>
//         {" "}
//         {/* Added relative positioning for sticky header */}
//         <table className="min-w-full divide-y divide-gray-200">
//           {/* Sticky Header */}
//           <thead className={`${headerBg} sticky top-0 z-10`}>
//             {" "}
//             {/* Added sticky, top-0, z-10 */}
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={col.accessor}
//                   scope="col"
//                   // Added border class for visual separation if needed
//                   className={`px-6 py-3 text-left text-xs font-bold ${headerText} uppercase tracking-wider ${border} border-b`}
//                 >
//                   {col.header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {data.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={columns.length}
//                   className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
//                 >
//                   {emptyMessage}
//                 </td>
//               </tr>
//             ) : (
//               data.map((row, rowIndex) => (
//                 <tr
//                   key={rowIndex}
//                   className={rowIndex % 2 !== 0 ? rowBg : "bg-white"}
//                 >
//                   {" "}
//                   {/* Ensure non-themed rows are white */}
//                   {columns.map((col) => (
//                     <td
//                       key={`${rowIndex}-${col.accessor}`}
//                       className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
//                     >
//                       {/* Using optional chaining and nullish coalescing for safer access */}
//                       {col.accessor
//                         .split(".")
//                         .reduce((obj, key) => obj?.[key], row) ?? "---"}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Table;




import React from "react";

function Table({
  columns = [],
  data = [],
  theme = {},
  emptyMessage = "No data available.",
  maxHeight = "max-h-[60vh]",
}) {
  const headerBg = theme.headerBg || "bg-gray-100";
  const headerText = theme.headerText || "text-gray-700";
  const rowBg = theme.rowBg || "bg-gray-50";
  const border = theme.border || "border-gray-300";

  return (
    <div className={`shadow border-b ${border} rounded-lg overflow-hidden`}>
      <div className={`overflow-y-auto relative ${maxHeight}`}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`${headerBg} sticky top-0 z-10`}>
            <tr>
              {columns.map((col) => (
                <th
                  // Use header as key if accessor might not be unique or present for render-only columns
                  key={col.header || col.accessor}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-bold ${headerText} uppercase tracking-wider ${border} border-b`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex} // Using index is okay if rows don't have stable IDs or aren't reordered
                  className={rowIndex % 2 !== 0 ? rowBg : "bg-white"}
                >
                  {columns.map((col) => (
                    <td
                      // Use header as key if accessor might not be unique or present
                      key={`${rowIndex}-${col.header || col.accessor}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    >
                      {/* *** MODIFICATION START *** */}
                      {/* Check if a custom render function exists */}
                      {typeof col.render === 'function'
                        ? col.render(row) // If yes, call it with the current row data
                        : col.accessor // If no, proceed with the accessor logic
                            .split(".")
                            .reduce((obj, key) => obj?.[key], row) ?? "---"
                      }
                      {/* *** MODIFICATION END *** */}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
