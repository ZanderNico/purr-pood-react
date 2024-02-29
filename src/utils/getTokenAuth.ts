const getTokenAuth = (): string => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      throw new Error("Token not found in localStorage");
    }
  
    return token;
  };
  
  export default getTokenAuth;