import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route, Link, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Dashboard from './pages/Dashboard.jsx'

function App() {
  const location = useLocation();
  const showNavBar = location.pathname === "/";


  return (
    <>
      {showNavBar && (
        <section id="top">
          <NavBar />
        </section>
      )}

        <section id="center">
    
          <Routes>
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>


      </section>



    </>
  )
}


export default App
