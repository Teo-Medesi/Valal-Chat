import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import JoinRoom from "./pages/JoinRoom";
import Chat from "./pages/Chat";
import io from "socket.io-client";
import "./assets/css/main.scss";
import Validate from "./components/Validate";

export const GlobalContext = createContext();

function App() {
  const socket = io(`http://localhost:${import.meta.env.VITE_PORT}`);
  const [user, setUser] = useState("");

  return (
    <GlobalContext.Provider value={{ socket, userState: [user, setUser] }}>
      <Routes>
        <Route index element={<JoinRoom />} />
        <Route path="/client/rooms/:id" element={<Validate><Chat /></Validate>} />
      </Routes>
    </GlobalContext.Provider>
  );
}

export default App;
