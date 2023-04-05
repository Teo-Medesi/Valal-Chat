import React, { createContext, useEffect, useReducer, useState } from "react";
import { Routes, Route } from "react-router-dom";
import JoinRoom from "./pages/JoinRoom";
import Chat from "./pages/Chat";
import io from "socket.io-client";
import "./assets/css/main.scss";
import Validate from "./components/Validate";

export const GlobalContext = createContext();

export const useUser = () => {
  const [user, dispatch] = useReducer((currentUser, action) => {
    switch(action.type) {
      case "set": 
        window.localStorage.setItem("USER", action.payload);
        return action.payload;
    }
  })
  
  useEffect(() => {
    const data = window.localStorage.getItem("USER");
    if (data) dispatch({type: "set", payload: data});
  }, [window.localStorage])

  return [user, dispatch];
}

function App() {
  const socket = io(`http://localhost:${import.meta.env.VITE_PORT}`);

  return (
      <GlobalContext.Provider value={socket}>
        <Routes>
          <Route index element={<JoinRoom />} />
          <Route path="/client/rooms/:id" element={<Validate><Chat /></Validate>} />
        </Routes>
      </GlobalContext.Provider>
  );
}

export default App;
