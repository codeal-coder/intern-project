
import React from "react"
import Login from "./components/Login"
import Register from "./components/Registration"
import Dashboard from "./components/Dashboard"
import { Routes,Route } from "react-router-dom"
function App() {
  

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
      
    </>
  )
}

export default App
