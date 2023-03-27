import React, { createContext, useEffect} from "react"
import { Routes, Route} from "react-router-dom"
import JoinRoom from "./pages/JoinRoom"
import Chat from "./pages/Chat"
import io from "socket.io-client"
import './assets/css/main.scss'

export const SocketContext = createContext();

function App() {
  const socket = io(`http://localhost:${import.meta.env.VITE_PORT}`);

  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route index element={<JoinRoom />} />
        <Route path="/test" element={<Chat />} />
      </Routes>
    </SocketContext.Provider >
  )
}

export default App
