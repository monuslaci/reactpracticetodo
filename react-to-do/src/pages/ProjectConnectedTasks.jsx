import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getTaskDetails, updateTask } from "../api/tasksApi.js";
import LeftNavBar from './../components/LeftNavBar.jsx'
import SearchBar from '../components/SearchBar.jsx';
import WorkCard from '../components/WorkCard.jsx';

const ProjectConnectedTasks = (item) => {
    const { id } = useParams();
    const [connectedTasks, setConnectedTasks] = useState(null);
    const [connectedTasksData, setConnectedTasksData] = useState(null);



    useEffect(() => {
        getTaskDetails(id)
            .then(({ taskDetails }) => setConnectedTasksData(taskDetails))
            .catch(console.error);
    }, [id]);

    return (
        <div className='flex h-screen overflow-hidden bg-[#F6F5F8]'>
            <div className="hidden lg:block">
                <LeftNavBar />
            </div>
            <form className="flex-1 overflow-y-auto font-[var(--font-menu)]">
                <div>Task ID: {id}</div>
                <div>{connectedTasksData ? JSON.stringify(connectedTasksData) : "Loading task details..."}</div>

                {connectedTasksData && 
                <div>
                    <label className="ml-3">Task Title 
                        <input name="title" defaultValue={connectedTasksData.title} className="rounded border border-gray-300 ml-3 py-0.5"></input>
                    </label>
                    <label className="ml-3">Task Description
                        <input name="description" defaultValue={connectedTasksData.description} className="rounded border border-gray-300 ml-3 py-0.5"></input>
                    </label>
                </div>
 
                }
            </form>
        </div>
    );


};

export default ProjectConnectedTasks;
