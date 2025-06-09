import {atom} from "recoil";

export const unreadNotificationsState = atom({
    key: 'unreadNotificationsState',
    default: [], // Default to an empty array
});

// Optional: Atom for the loading state of these notifications
export const unreadNotificationsLoadingState = atom({
    key: 'unreadNotificationsLoadingState',
    default: true, // Assume loading initially
});

// Optional: Atom for any error fetching these notifications
export const unreadNotificationsErrorState = atom({
    key: 'unreadNotificationsErrorState',
    default: null,
});
