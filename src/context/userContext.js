import { createContext, useReducer } from "react";
import userReducer, { initialState } from "../reducers/userReducer";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer,initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
