const fetchUser = () => {
        const userLS = localStorage.getItem("user");
        if (userLS === null) return null;
        try {
          const userDetails = JSON.parse(userLS);
          return userDetails;
        } catch (error) {
          console.error("Error parsing user from localStorage", error);
          // Fallback defaults in case of parsing issues.
          return null;
        }
      };
export default fetchUser;