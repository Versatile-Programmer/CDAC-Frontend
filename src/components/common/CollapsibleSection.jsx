// components/common/CollapsibleSection.jsx
import { useState } from "react";

const CollapsibleSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border border-gray-300 rounded mb-4">
            <button
                type="button"
                className="w-full flex justify-between items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 font-semibold text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{title}</span>
                <span>{isOpen ? "-" : "+"}</span>
            </button>
            {isOpen && (
                <div className="p-4 bg-white">
                    {children}
                </div>
            )}
        </div>
    );
};

export default CollapsibleSection;
