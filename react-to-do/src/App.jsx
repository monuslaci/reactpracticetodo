import './App.css'
import { Navigate, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard.jsx'
import Test from './pages/Test.jsx'

function App() {
  return (
    <>
        <section id="center">
    
          <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/test" element={<Test />} />

        </Routes>


      </section>



    </>
  )
}


export default App
