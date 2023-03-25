import React from "react"
import './assets/css/main.scss'
import { Routes, Route} from "react-router-dom"
import JoinRoom from "./pages/JoinRoom"

function App() {
  return (
    <Routes>
      <Route index element={<JoinRoom />} />
    </Routes>
  )
}

export default App
