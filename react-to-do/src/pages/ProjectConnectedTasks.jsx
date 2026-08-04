import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getTaskDetails, updateTask } from "../api/tasksApi.js";
import { getProjectDetails, createProject, updateProject } from "../api/projectsApi.js";
import LeftNavBar from './../components/LeftNavBar.jsx'
import SearchBar from '../components/SearchBar.jsx';
import WorkCard from '../components/WorkCard.jsx';
import { statusLabels } from "../params/params.js";
import { useNavigate } from 'react-router-dom';

const ProjectConnectedTasks = (item) => {
    const { id } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);
    const [connectedTasksList, setConnectedTasksList] = useState([]);
    const [isCreate, setIsCreate] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();


useEffect(() => {
    async function loadProject() {
        try {
            if (!id) 
            {
                setIsCreate(true);

                setProjectDetails({
                    name: "",
                    description: "",
                    status: Object.keys(statusLabels)[0] ?? "",
                    dueDate: ""
                    
                });

                return;
            }
            setIsCreate(false);

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


    const handleChange = (event) => {
        const { name, value } = event.target;

        setProjectDetails((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!projectDetails) return;

        setIsSaving(true);
        setSaveMessage("");

        try {
            const response = isCreate ? await createProject(projectDetails) : await updateProject(id, projectDetails);

            if (response?.projectDetails) {
                setProjectDetails(response.projectDetails);
            }

            setSaveMessage(isCreate ? "Project created successfully." : "Project updated successfully.");
            if (isCreate)
            {
                console.log("Navigating to project details page for new project with ID:", response.projectDetails.id);
                navigate(`/projectsDetails/${response.projectDetails.id}`);
            }
        } catch (error) {
            console.error("Failed to save project:", error);
            setSaveMessage(isCreate ? "Failed to create project." : "Failed to update project.");
        } finally {
            setIsSaving(false);
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "";

        return new Date(timestamp._seconds * 1000).toLocaleString();
    };


    return (
        <div className='flex h-screen overflow-hidden bg-[#F6F5F8]'>
            <div className="hidden lg:block">
                <LeftNavBar />
            </div>
                   <div className="flex min-w-0 flex-1 flex-col mt-30">
                        <form onSubmit={handleSubmit} className="flex w-full flex-1 items-center justify-center overflow-y-auto p-6 font-[var(--font-menu)]">
                            {projectDetails && (
                                <div className="w-full max-w-6xl rounded-lg bg-white p-6 shadow">
                                    <span className="mb-4 block text-[32px] font-semibold">
                                        {isCreate ? "Create project" : "Edit project"}
                                    </span>
                                    <div className="grid grid-cols-[160px_1fr] gap-x-6 gap-y-4">
                                        <label
                                            htmlFor="title"
                                            className="self-center font-medium"
                                        >
                                            Name
                                        </label>
            
                                        <input
                                            id="name"
                                            name="name"
                                            value={projectDetails.name ?? ""}
                                            onChange={handleChange}
                                            className="rounded border border-gray-300 px-3 py-2"
                                        />
            
                                        <label
                                            htmlFor="description"
                                            className="self-center font-medium"
                                        >
                                            Description
                                        </label>
            
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={projectDetails.description ?? ""}
                                            onChange={handleChange}
                                            rows={4}
                                            className="rounded border border-gray-300 px-3 py-2"
                                        />
            
                                        <label
                                            htmlFor="status"
                                            className="self-center font-medium"
                                        >
                                            Status
                                        </label>
            
                                        <select
                                            id="status"
                                            name="status"
                                            value={projectDetails.status ?? ""}
                                            onChange={handleChange}
                                            className="rounded border border-gray-300 px-3 py-2"
                                        >
                                            {Object.entries(statusLabels).map(
                                                ([value, label]) => (
                                                    <option key={value} value={value}>
                                                        {label}
                                                    </option>
                                                )
                                            )}
                                        </select>
            
                            
                                        {!isCreate && (
                                        <>
                                            <span className="font-medium text-gray-600">
                                                Created
                                            </span>
            
                                            <span className="text-left text-gray-500">
                                                {formatTimestamp(projectDetails.createdAt)}
                                            </span>
            
                                            <span className="font-medium text-gray-600">
                                                Last Updated
                                            </span>
            
                                            <span className="text-left text-gray-500">
                                                {formatTimestamp(projectDetails.updatedAt)}
                                            </span>
                                        </>
                                        )}
            
                                    </div>
            
                                    <div className="mt-6 flex items-center justify-end gap-4">
                                        {saveMessage && (
                                            <span className="text-sm text-gray-600">
                                                {saveMessage}
                                            </span>
                                        )}
                                        {!isCreate && (
                                            <button type="submit" disabled={isSaving} className="rounded bg-blue-600 px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50" >
                                                {isSaving ? "Saving..." : "Save changes"}
                                            </button>
                                        )} 
                                        {isCreate && (
                                            <button type="submit" disabled={isSaving} className="rounded bg-blue-600 px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50" >
                                                {isSaving ? "Creating project..." : "Create project"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </form>
                        <form className="flex-1 overflow-y-auto font-[var(--font-menu)]">
                            <span className="mb-4 mt-30 block text-lg font-semibold text-[32px]">
                                Tasks connected to { projectDetails ? projectDetails.name : "this"} project
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

        </div>
    );


};

export default ProjectConnectedTasks;
