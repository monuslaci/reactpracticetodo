import { useEffect, useState } from 'react'
import { getProjectsData } from "../api/projectsApi.js";
import LeftNavBar from './../components/LeftNavBar.jsx'

const Projects = () => {
    const [projectsData, setProjectsData] = useState(null);

useEffect(() => {
    getProjectsData()
        .then((data) => {
            setProjectsData(data.allProjects);
            console.log("Projects data fetched successfully:", data.allProjects);
        })
        .catch((error) => {
            console.error("Error fetching projects data:", error);
        });
}, []);

return (
        <div className='flex h-screen overflow-hidden bg-[#F6F5F8]'>
            {/* ** Sidebar */}
            <div className="hidden lg:block">
                <LeftNavBar />
            </div>
        {projectsData ? (
            projectsData.map((project) => (
        
                <div className="flex-1 h-37.5 w-55 rounded-[32px] bg-[#166b6a] gap-2.5 shadow-sm">
                    <div className="ml-5.5 mr-5.5">
                        <div key={project.id}>
                                <h3>{project.title}</h3>   
                            Assigned to: {project.assignee?.name || "Unassigned"}
                            <br />
                            Status: {project.status}
                            <br />
                            Priority: {project.priority}
                        </div>
                    </div>
                </div>
    
            ))
        ) : (
            <div>Loading projects...</div>
            )}
    </div>
);

};

export default Projects;