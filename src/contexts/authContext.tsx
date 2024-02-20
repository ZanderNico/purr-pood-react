import { createContext, useEffect, useState } from "react";
import React from "react";
import {jwtDecode}from 'jwt-decode'; 

interface UserContextState {
  userData: {
    user_id: number;
    email: string;
    user_name: string;
    user_role: string;
  };
  token: string | null;
  setUserData: (data: object) => void;
  setToken: (token: string) => void;
}

export const UserContext = createContext<UserContextState>({
  userData: { user_id: 0, email: '', user_name: '', user_role: '' },
  token: '',
  setUserData: () => {},
  setToken: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUserData(decodedToken);
      setToken(storedToken);
    }
  }, []);
  console.log(token)

  return (
    <UserContext.Provider value={{ userData, token, setUserData, setToken }}>
      {children}
    </UserContext.Provider>
  );
};