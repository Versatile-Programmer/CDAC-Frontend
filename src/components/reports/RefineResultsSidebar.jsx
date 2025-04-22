// src/components/reports/RefineResultsSidebar.jsx
import React from "react";
import VerticalRadioGroup from "../forms/VerticalRadioGroup";

// Accept props for state and handlers
function RefineResultsSidebar({
  currentExpiryFilter,
  onExpiryChange,
  currentSortOption,
  onSortChange,
}) {
  // Options remain the same
  const expiryOptions = [
    { value: "90", label: "90 Days" },
    { value: "60", label: "60 days" },
    { value: "30", label: "30 days" },
    { value: "15", label: "15 days" },
    { value: "all", label: "All (Active/Pending)" }, // Clarified label
    { value: "expired", label: "All Expired" },
  ];

  const sortOptions = [
    { value: "domainNameAsc", label: "Domain Name (Ascending)" },
    { value: "domainNameDesc", label: "Domain Name (Descending)" },
    { value: "expiryDateAsc", label: "Expiry date (earliest first)" },
    { value: "expiryDateDesc", label: "Expiry date (last first)" },
  ];

  // Handler function now just calls the passed prop function
  const handleExpiryRadioChange = (e) => {
    onExpiryChange(e.target.value); // Call the setter from ReportsPage
  };

  const handleSortRadioChange = (e) => {
    onSortChange(e.target.value); // Call the setter from ReportsPage
  };

  return (
    <aside className="bg-yellow-50 p-4 rounded-lg shadow border border-yellow-200">
      <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
        Refine Results
      </h2>

      {/* --- Expiring In Filter --- */}
      <VerticalRadioGroup
        title="Expiring in"
        name="expiryFilter"
        options={expiryOptions}
        selectedValue={currentExpiryFilter} // Use prop value
        onChange={handleExpiryRadioChange} // Use handler
      />

      {/* --- Sort By Filter --- */}
      <VerticalRadioGroup
        title="Sort by"
        name="sortOption"
        options={sortOptions}
        selectedValue={currentSortOption} // Use prop value
        onChange={handleSortRadioChange} // Use handler
      />

      {/* --- Placeholder for More Filters --- */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          More Filters (Future)
        </h3>
        <p className="text-xs text-gray-500 italic">
          Status, Centre, Group, etc.
        </p>
      </div>
    </aside>
  );
}

export default RefineResultsSidebar;
