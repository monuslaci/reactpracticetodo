import './App.css'
import { Navigate, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard.jsx'
import Projects from './pages/Projects.jsx'
import Tasks from './pages/Tasks.jsx'
import TaskDetails from './pages/TasksDetails.jsx'
import ProjectConnectedTasks from './pages/ProjectConnectedTasks.jsx'

function App() {
  return (
    <>
        <section id="center">
    
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/taskDetails/:id" element={<TaskDetails />} />
            <Route path="/projectDetails/:id" element={<ProjectConnectedTasks />} />
            <Route path="/projects" element={<Projects />} />

        </Routes>


      </section>



    </>
  )
}


export default App
