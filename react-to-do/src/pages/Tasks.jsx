import { useEffect, useState } from 'react'
import { getTasksData } from "../api/tasksApi.js";
import LeftNavBar from './../components/LeftNavBar.jsx'

const Tasks = () => {
    const [tasksData, setTasksData] = useState(null);

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
            {/* ** Sidebar */}
            <div className="hidden lg:block">
                <LeftNavBar />
            </div>
        {tasksData ? (
            tasksData.map((task) => (
        
                <div className="flex-1 h-37.5 w-55 rounded-[32px] bg-[#166b6a] gap-2.5 shadow-sm">
                    <div className="ml-5.5 mr-5.5">
                        <div key={task.id}>
                                <h3>{task.title}</h3>   
                            Assigned to: {task.assignee?.name || "Unassigned"}
                            <br />
                            Status: {task.status}
                            <br />
                            Priority: {task.priority}
                        </div>
                    </div>
                </div>
    
            ))
        ) : (
            <div>Loading tasks...</div>
            )}
    </div>

);

};

export default Tasks;