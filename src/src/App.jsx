import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import AppLayout from "./models/layout"

import Checktoken from "./models/lib/token"
import Login from "./models/login"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Checktoken />}>
          <Route path="/*" element={<AppLayout />} />
        </Route>
        <Route path="*" element={<Login />} /> {/* Default ไปที่ Login */}
      </Routes>
    </Router>
  )
}

export default App
