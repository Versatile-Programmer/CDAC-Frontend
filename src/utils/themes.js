// src/utils/themes.js

// Using the themes you provided
export const expiringDomainThemes = {
    '90': { // Use string keys to match URL param easily
        name: 'Sky',
        headerBg: "bg-sky-100", // Slightly darker for header
        headerText: "text-sky-900",
        rowBg: "bg-sky-50", // Alternating row background
        rowText: "text-gray-700", // Default text color for rows
        border: "border-sky-200",
        link: "text-sky-700 hover:text-sky-900",
    },
    '60': {
        name: 'Emerald',
        headerBg: "bg-emerald-100",
        headerText: "text-emerald-900",
        rowBg: "bg-emerald-50",
        rowText: "text-gray-700",
        border: "border-emerald-200",
        link: "text-emerald-700 hover:text-emerald-900",
    },
    '30': {
        name: 'Amber',
        headerBg: "bg-amber-100",
        headerText: "text-amber-900",
        rowBg: "bg-amber-50",
        rowText: "text-gray-700",
        border: "border-amber-200",
        link: "text-amber-700 hover:text-amber-900",
    },
    '15': {
        name: 'Rose',
        headerBg: "bg-rose-100",
        headerText: "text-rose-900",
        rowBg: "bg-rose-50",
        rowText: "text-gray-700",
        border: "border-rose-200",
        link: "text-rose-700 hover:text-rose-900",
    },
    // Add a default theme if the parameter doesn't match
    default: {
        name: 'Gray',
        headerBg: "bg-gray-100",
        headerText: "text-gray-900",
        rowBg: "bg-gray-50",
        rowText: "text-gray-700",
        border: "border-gray-200",
        link: "text-blue-700 hover:text-blue-900", // Default link color
    }
};

// Function to get theme based on days parameter
export const getThemeForDays = (days) => {
    return expiringDomainThemes[days] || expiringDomainThemes.default;
};