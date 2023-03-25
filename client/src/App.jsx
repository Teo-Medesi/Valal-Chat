import React from "react"
import './assets/css/main.scss'
import { Routes, Route} from "react-router-dom"
import JoinRoom from "./pages/JoinRoom"
import Chat from "./pages/Chat"

function App() {
  return (
    <Routes>
      <Route index element={<JoinRoom />} />
      <Route path="/test" element={<Chat />} />
    </Routes>
  )
}

export default App
