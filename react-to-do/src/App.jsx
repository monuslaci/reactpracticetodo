import './App.css'
import { Navigate, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard.jsx'
import Projects from './pages/Projects.jsx'
import Tasks from './pages/Tasks.jsx'

function App() {
  return (
    <>
        <section id="center">
    
          <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
           <Route path="/projects" element={<Projects />} />

        </Routes>


      </section>



    </>
  )
}


export default App
