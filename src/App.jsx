import React, { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { UserContext } from "./UserContext.js";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [userID, setUserID] = useState(false);
  const [userRole, setUserRole] = useState("anon");
  return (
    <div className="app">
      <UserContext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          token,
          setToken,
          userID,
          setUserID,
          userRole,
          setUserRole,
        }}
      >
        <Outlet />
      </UserContext.Provider>
    </div>
  );
}

export default App;
