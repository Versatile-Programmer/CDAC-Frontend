import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  totalElements,
  itemsPerPage,
  itemsOnPage,
}) {
  if (totalPages <= 1) {
    return null; // Don't render controls if there's only one page or less
  }

  const startItem = currentPage * itemsPerPage + 1;
  const endItem = currentPage * itemsPerPage + itemsOnPage;

  return (
    <div className="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200 sm:px-6 rounded-b-lg">
      {/* Information text */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-start">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{startItem}</span> to{' '}
          <span className="font-medium">{endItem}</span> of{' '}
          <span className="font-medium">{totalElements}</span> results
        </p>
      </div>

      {/* Pagination buttons */}
      <div className="flex-1 flex justify-between sm:justify-end">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </button>
        <div className="flex items-center mx-4 text-sm text-gray-500">
          Page {currentPage + 1} of {totalPages}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage + 1 >= totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <FaChevronRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default PaginationControls;