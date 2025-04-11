// src/components/domain-detail/DomainInfoDisplay.jsx
import React from "react";

// Simple component to display key-value pairs
const InfoItem = ({ label, value }) => (
  <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      {value || "N/A"}
    </dd>
  </div>
);

function DomainInfoDisplay({ domainData = {} }) {
  // Destructure data or use defaults
  const {
    domainName,
    status,
    expiryDate,
    drmName,
    armName,
    group,
    centre,
    ipAddress,
    // Add all other fields from domainData here
  } = domainData;

  return (
    <dl className="divide-y divide-gray-200">
      <InfoItem label="Domain Name" value={domainName} />
      <InfoItem label="Current Status" value={status} />
      <InfoItem label="Expiry Date" value={expiryDate} />
      <InfoItem label="DRM Name" value={drmName} />
      <InfoItem label="ARM Name" value={armName} />
      <InfoItem label="Group" value={group} />
      <InfoItem label="Centre" value={centre} />
      <InfoItem label="IP Address" value={ipAddress} />
      {/* Add InfoItem for ALL other details */}
    </dl>
  );
}
export default DomainInfoDisplay;
