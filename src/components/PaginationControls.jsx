// import React from 'react';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// function PaginationControls({
//   currentPage,
//   totalPages,
//   onPageChange,
//   totalElements,
//   itemsPerPage,
//   itemsOnPage,
// }) {
//   if (totalPages <= 1) {
//     return null; // Don't render controls if there's only one page or less
//   }

//   const startItem = currentPage * itemsPerPage + 1;
//   const endItem = currentPage * itemsPerPage + itemsOnPage;

//   return (
//     <div className="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200 sm:px-6 rounded-b-lg">
//       {/* Information text */}
//       <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-start">
//         <p className="text-sm text-gray-700">
//           Showing <span className="font-medium">{startItem}</span> to{' '}
//           <span className="font-medium">{endItem}</span> of{' '}
//           <span className="font-medium">{totalElements}</span> results
//         </p>
//       </div>

//       {/* Pagination buttons */}
//       <div className="flex-1 flex justify-between sm:justify-end">
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 0}
//           className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <FaChevronLeft className="mr-2 h-4 w-4" />
//           Previous
//         </button>
//         <div className="flex items-center mx-4 text-sm text-gray-500">
//           Page {currentPage + 1} of {totalPages}
//         </div>
//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage + 1 >= totalPages}
//           className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Next
//           <FaChevronRight className="ml-2 h-4 w-4" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PaginationControls;


import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// This component is now flexible and handles both 0-based and 1-based pagination.
function PaginationControls({
  currentPage,    // The page number (can be 0-based or 1-based from the parent)
  totalPages,
  onPageChange,
  totalElements,
  itemsPerPage,
  itemsOnPage,
  startIndex = 0, // NEW PROP: Defaults to 0 for backward compatibility
}) {

  // --- CRITICAL LOGIC ---
  // Determine if there are previous or next pages based on the startIndex.
  const hasPrevious = currentPage > startIndex;
  const hasNext = currentPage < totalPages - (1 - startIndex);

  /*
    Let's test the `hasNext` logic:
    - totalPages = 5
    - If 1-indexed (startIndex=1): hasNext is true until currentPage is 4.
      When currentPage=4, 4 < 5 - (1 - 1) => 4 < 5. Correct.
      When currentPage=5, 5 < 5 - (1 - 1) => 5 < 5. False. Correct.
    - If 0-indexed (startIndex=0): hasNext is true until currentPage is 3.
      When currentPage=3, 3 < 5 - (1 - 0) => 3 < 4. Correct.
      When currentPage=4, 4 < 5 - (1 - 0) => 4 < 4. False. Correct.
  */

  const handlePrevious = () => {
    if (hasPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onPageChange(currentPage + 1);
    }
  };
  
  // Calculate display values
  const displayPage = currentPage - startIndex + 1;
  const firstItem = totalElements > 0 ? (displayPage - 1) * itemsPerPage + 1 : 0;
  const lastItem = firstItem + itemsOnPage - 1;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 border-t border-gray-200">
      {/* Information text for mobile */}
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={handlePrevious}
          disabled={!hasPrevious}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!hasNext}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      
      {/* Desktop layout */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{firstItem}</span> to <span className="font-medium">{lastItem}</span> of{' '}
            <span className="font-medium">{totalElements}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={handlePrevious}
              disabled={!hasPrevious}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">
              {/* Always display a 1-based page number to the user */}
              Page {displayPage} of {totalPages}
            </span>
            
            <button
              onClick={handleNext}
              disabled={!hasNext} // This check now works for both systems
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <FiChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default PaginationControls;