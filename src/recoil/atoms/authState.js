// src/recoil/atoms/authState.js
import { atom } from 'recoil';

const getInitialToken = () => localStorage.getItem('authToken');
const getInitialUser = () => {
    const user = localStorage.getItem('user');
    try {
        // Expecting user object like { id, email, name, role }
        return user ? JSON.parse(user) : null;
    } catch (e) {
        console.error("Error parsing user from localStorage", e);
        localStorage.removeItem('user');
        return null;
    }
};

// Stores the JWT or other auth token
export const authTokenState = atom({
    key: 'authTokenState',
    default: getInitialToken(),
});

// Stores the logged-in user's details ({ id, email, name, role })
export const userState = atom({
    key: 'userState',
    default: getInitialUser(),
});

// Derived state? Or simple boolean atom is fine too.
// A simple boolean reflecting if authToken exists
export const isAuthenticatedState = atom({
    key: 'isAuthenticatedState',
    default: false,
})