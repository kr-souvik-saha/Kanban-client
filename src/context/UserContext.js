import { useEffect, useState, createContext } from "react";
import { miniProfileController } from "../controller/UserController";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  useEffect(() => {
    async function fetchData() {
      const response = await miniProfileController();
      let data;
      response ? (data = response) : (data = null);
      if (data) {
        setUserId(data.userId);
        setUserName(data.userName);
      }
    }

    fetchData();
  }, []);
  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        userId,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
