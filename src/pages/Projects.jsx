import { useEffect, useState } from 'react'
import { getProjectsData, searchProjects } from "../api/projectsApi.js";
import LeftNavBar from './../components/LeftNavBar.jsx'
import SearchBar from '../components/SearchBar.jsx';
import WorkCard from '../components/WorkCard.jsx';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
    const navigate = useNavigate();
    const [projectsData, setProjectsData] = useState(null);
    const handleProjectSearch = async (searchTerm) => {
        const response = searchTerm.trim()
            ? await searchProjects(searchTerm.trim())
            : await getProjectsData();

        setProjectsData(response.allProjects);
    };
    
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
        <div className="hidden lg:block">
            <LeftNavBar />
        </div>
        <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-277.75 px-4">
                <SearchBar page="projects" onSearch={handleProjectSearch} />
                                  <>
                <button className="flex items-center m-15 gap-2 rounded bg-blue-600 px-4 py-2 text-white" onClick={() => navigate('/projectsDetails')}>
                <FaPlus />
                Create Project
            </button>
            
                    </>
                {projectsData ? (
                    <div className="grid grid-cols-1 gap-5 pb-8 sm:grid-cols-2 xl:grid-cols-3">
                        {projectsData.map((project) => (
                            <WorkCard key={project.id} item={project} icon="/projects.svg" type="project" />
                        ))}
                    </div>
                ) : (
                    <div>Loading projects...</div>
                )}
            </div>
        </div>
    </div>
);

};

export default Projects;
