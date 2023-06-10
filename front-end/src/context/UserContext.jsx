import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext =  createContext({})

export function UserContextProvider({children}){
const [username, setUsername] = useState(null)
const [userId, setUserId] = useState(null)
useEffect(() => {
    axios.get('http://localhost:8080/profile', { withCredentials: true })
      .then(response => {
        setUsername(response.data.userName)
        setUserId(response.data.id)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
return (
<UserContext.Provider value={{username, setUsername, userId, setUserId}}>{children}</UserContext.Provider>
);
} 