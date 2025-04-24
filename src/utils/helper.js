// Simulate getting user role from context/auth (replace with real logic)
export const getUserRole = () => {
    const userLS = localStorage.getItem("user");
    if (userLS === null) return "DRM";
    try {
        const userDetails = JSON.parse(userLS);
        return userDetails.role || "DRM";
    } catch (error) {
        console.error(error);
        return "DRM";
    }
};