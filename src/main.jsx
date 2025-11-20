import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import Confirm from './Confirm'
import Legal from './Legal'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/impressum" element={<Legal type="impressum" />} />
        <Route path="/datenschutz" element={<Legal type="datenschutz" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
