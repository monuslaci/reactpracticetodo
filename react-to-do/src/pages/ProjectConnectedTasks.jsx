import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getTaskDetails, updateTask } from "../api/tasksApi.js";
import { getProjectDetails } from "../api/projectsApi.js";
import LeftNavBar from './../components/LeftNavBar.jsx'
import SearchBar from '../components/SearchBar.jsx';
import WorkCard from '../components/WorkCard.jsx';

const ProjectConnectedTasks = (item) => {
    const { id } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);
    const [connectedTasksList, setConnectedTasksList] = useState([]);



useEffect(() => {
    async function loadProject() {
        try {
            const { projectDetails } = await getProjectDetails(id);

            setProjectDetails(projectDetails);

            const taskIds = projectDetails.taskIds || [];

            const taskPromises = taskIds.map(taskId =>
                getTaskDetails(taskId)
            );

            const results = await Promise.all(taskPromises);

            const tasks = results.map(r => r.taskDetails);

            setConnectedTasksList(tasks);
        }
        catch (err) {
            console.error(err);
        }
    }

    loadProject();
}, [id]);


    return (
        <div className='flex h-screen overflow-hidden bg-[#F6F5F8]'>
            <div className="hidden lg:block">
                <LeftNavBar />
            </div>
            <form className="flex-1 overflow-y-auto font-[var(--font-menu)]">
                <span className="mb-4 mt-30 block text-lg font-semibold text-[32px]">
                    Tasks connected to {projectDetails ? projectDetails.name : "this"} project
                </span>

                <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
                    {connectedTasksList?.map((task) => (
                        <WorkCard
                            key={task.id}
                            item={task}
                            icon="/tasks.svg"
                            type="task"
                        />
                    ))}
                </div>
            </form>
        </div>
    );


};

export default ProjectConnectedTasks;
