import { useEffect, useState } from 'react'
import { getTasksData, searchTasks } from "../api/tasksApi.js";
import LeftNavBar from './../components/LeftNavBar.jsx'
import SearchBar from '../components/SearchBar.jsx';
import WorkCard from '../components/WorkCard.jsx';

const Tasks = () => {
    const [tasksData, setTasksData] = useState(null);

    const handleTaskSearch = async (searchTerm) => {
        const response = searchTerm.trim()
            ? await searchTasks(searchTerm.trim())
            : await getTasksData();

        setTasksData(response.allTasks);
    };

useEffect(() => {
    getTasksData()
        .then((data) => {
            setTasksData(data.allTasks);
            console.log("Tasks data fetched successfully:", data.allTasks);
        })
        .catch((error) => {
            console.error("Error fetching tasks data:", error);
        });
}, []);


return (
    <div className='flex h-screen overflow-hidden bg-[#F6F5F8]'>
        <div className="hidden lg:block">
            <LeftNavBar />
        </div>
        <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-277.75 px-4">
                <SearchBar page="tasks" onSearch={handleTaskSearch} />
                {tasksData ? (
                    <div className="grid grid-cols-1 gap-5 pb-8 sm:grid-cols-2 xl:grid-cols-3">
                        {tasksData.map((task) => (
                            <WorkCard key={task.id} item={task} icon="/tasks.svg" type="task" />
                        ))}
                    </div>
                ) : (
                    <div>Loading tasks...</div>
                )}
            </div>
        </div>
    </div>
);

};

export default Tasks;
