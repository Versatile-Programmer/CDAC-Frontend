// src/components/modals/ConfirmationModal.jsx
import React from "react";

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  if (!isOpen) {
    return null;
  }

  return (
    // Main overlay
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
      aria-modal="true"
      role="dialog"
    >
      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-600">{message}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-150"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;