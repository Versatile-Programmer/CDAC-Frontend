// src/components/domain-detail/DomainStatusMap.jsx
import React from "react";
// Using Material Design Icons
import { MdCheckCircle, MdHourglassTop } from "react-icons/md";

function DomainStatusMap({ domainStatus }) {
  // Define the steps in your workflow IN ORDER
  const steps = [
    "Application Submitted",
    "ARM Forwarded",
    "HOD Verified",
    "ED Approved",
    "NetOps Verified",
    "Webmaster Verified",
    "HPC Recommended",
    "Purchased",
    "Active",
    // Add other steps as needed
  ];

  const currentStepIndex = steps.indexOf(domainStatus);
  const unknownStatus = currentStepIndex === -1;

  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <h4 className="text-sm font-medium text-gray-600 mb-4">
        Current Status:
        <span
          className={`ml-2 font-semibold ${
            unknownStatus ? "text-red-600" : "text-indigo-700"
          }`}
        >
          {domainStatus || "Unknown"}
        </span>
      </h4>

      {/* Status Steps Visualization - Horizontal Scroll */}
      <div className="relative w-full overflow-x-auto pb-4">
        <div className="flex items-start min-w-max px-2">
          {" "}
          {/* Use min-w-max for horizontal content */}
          {steps.map((step, index) => {
            const isCompleted = !unknownStatus && currentStepIndex > index;
            const isCurrent = !unknownStatus && currentStepIndex === index;
            const isFuture = unknownStatus || currentStepIndex < index;

            // --- Determine Styles based on State ---
            // Using Amber for completed, Indigo for current, Gray for future
            let circleStyle = "border-gray-300 bg-white text-gray-400"; // Future state default
            let icon = <span className="text-xs font-bold">{index + 1}</span>;
            let lineStyle = "bg-gray-300"; // Future connector line

            if (isCurrent) {
              circleStyle =
                "border-indigo-500 bg-indigo-100 text-indigo-600 ring-2 ring-indigo-200 ring-offset-1";
              // Using animate-spin for visual cue on current step
              icon = <MdHourglassTop className="w-4 h-4 animate-spin" />;
              // Line leading *to* current step is still gray/pending
              // Line *after* current step (handled by next iteration) is gray
            } else if (isCompleted) {
              circleStyle = "border-amber-400 bg-amber-300 text-amber-800"; // Amber for completed
              icon = <MdCheckCircle className="w-4 h-4" />;
              lineStyle = "bg-amber-400"; // Completed connector line color (Amber)
            }
            // Future steps keep default styles

            return (
              <React.Fragment key={step}>
                {/* Step Indicator (Circle + Icon/Number) */}
                <div className="flex flex-col items-center z-10 relative flex-shrink-0">
                  {" "}
                  {/* flex-shrink-0 prevents shrinking */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${circleStyle}`}
                  >
                    {icon}
                  </div>
                  <p
                    className={`mt-1.5 text-xs text-center w-24 break-words ${
                      isFuture ? "text-gray-500" : "text-gray-700 font-medium"
                    }`}
                  >
                    {step}
                  </p>
                </div>

                {/* Connecting Line (except for the last step) */}
                {index < steps.length - 1 && (
                  // Use flex-auto, center vertically, place behind circles
                  <div className="flex-auto flex items-center mt-4 -mx-2 relative z-0">
                    {/* Line color depends on whether the *current* step is completed */}
                    <div
                      className={`h-0.5 w-full ${
                        isCompleted ? lineStyle : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {unknownStatus && (
        <p className="text-xs text-red-600 mt-2 italic">
          Note: Current status "{domainStatus}" is not recognized in the
          standard workflow visualization.
        </p>
      )}
    </div>
  );
}

export default DomainStatusMap;
