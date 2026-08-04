import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskDetails, updateTask, createTask, getTasksData } from "../api/tasksApi.js";
import LeftNavBar from "./../components/LeftNavBar.jsx";
import { statusLabels, prioLabels, assignees  } from "../params/params.js";

const TaskDetails = () => {
    const { id } = useParams();
    const [taskData, setTaskData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const [isCreate, setIsCreate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) 
            {
                setIsCreate(true);

                setTaskData({
                    title: "",
                    description: "",
                    status: Object.keys(statusLabels)[0] ?? "",
                    priority: Object.keys(prioLabels)[0] ?? "",
                    department: "",
                    dueDate: "",
                    assignee: {
                        name: assignees[0]?.name ?? "",
                        email: assignees[0]?.email ?? "",
                        avatar: "/user.png",
                    },
                });

            return;
            }
        setIsCreate(false);
        getTaskDetails(id)
            .then(({ taskDetails }) => setTaskData(taskDetails))
            .catch(console.error);
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setTaskData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!taskData) return;

        setIsSaving(true);
        setSaveMessage("");

        try {
            const response = isCreate ? await createTask(taskData) : await updateTask(id, taskData);

            if (response?.taskDetails) {
                setTaskData(response.taskDetails);
            }

            setSaveMessage(isCreate ? "Task created successfully." : "Task updated successfully.");
            if (isCreate)
            {
                console.log("Navigating to task details page for new task with ID:", response.taskDetails.id);
                navigate(`/tasksDetails/${response.taskDetails.id}`);
            }
        } catch (error) {
            console.error("Failed to save task:", error);
            setSaveMessage(isCreate ? "Failed to create task." : "Failed to update task.");
        } finally {
            setIsSaving(false);
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "";

        return new Date(timestamp._seconds * 1000).toLocaleString();
    };

    const handleAssigneeChange = (event) => {
        const selectedAssignee = assignees.find(
            (assignee) => assignee.email === event.target.value
        );

        if (!selectedAssignee) return;

        setTaskData((current) => ({
            ...current,
            assignee: {
                name: selectedAssignee.name,
                email: selectedAssignee.email,
                avatar: "/user.png",
            },
        }));
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[#F6F5F8]">
            <div className="hidden lg:block">
                <LeftNavBar />
            </div>
       
            <form onSubmit={handleSubmit} className="flex min-w-0 flex-1 items-center justify-center overflow-y-auto p-6 font-[var(--font-menu)]">
                {taskData && (                    
                    <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow">
                        <span className="mb-4 block text-[32px] font-semibold">
                            {isCreate ? "Create task" : "Edit task"}
                        </span>
                        <div className="grid grid-cols-[160px_1fr] gap-x-6 gap-y-4">
                            <label
                                htmlFor="title"
                                className="self-center font-medium"
                            >
                                Task Title
                            </label>

                            <input
                                id="title"
                                name="title"
                                value={taskData.title ?? ""}
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
                                value={taskData.description ?? ""}
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
                                value={taskData.status ?? ""}
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

                            <label
                                htmlFor="priority"
                                className="self-center font-medium"
                            >
                                Priority
                            </label>

                            <select
                                id="priority"
                                name="priority"
                                value={taskData.priority ?? ""}
                                onChange={handleChange}
                                className="rounded border border-gray-300 px-3 py-2"
                            >
                                {Object.entries(prioLabels).map(
                                    ([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    )
                                )}
                            </select>

                            <label
                                htmlFor="department"
                                className="self-center font-medium"
                            >
                                Department
                            </label>

                            <input
                                id="department"
                                name="department"
                                value={taskData.department ?? ""}
                                onChange={handleChange}
                                className="rounded border border-gray-300 px-3 py-2"
                            />

                            <label
                                htmlFor="dueDate"
                                className="self-center font-medium"
                            >
                                Due Date
                            </label>

                            <input
                                id="dueDate"
                                type="date"
                                name="dueDate"
                                value={taskData.dueDate ?? ""}
                                onChange={handleChange}
                                className="rounded border border-gray-300 px-3 py-2"
                            />
                            <label
                                htmlFor="assignee"
                                className="self-center font-medium"
                            >
                                Assignee
                            </label>

                            <select
                                id="assignee"
                                value={taskData.assignee.email}
                                onChange={handleAssigneeChange}
                                className="rounded border border-gray-300 px-3 py-2"
                            >
                                {assignees.map((assignee) => (
                                    <option
                                        key={assignee.email}
                                        value={assignee.email}
                                    >
                                        {assignee.name}
                                    </option>
                                ))}
                            </select>
                            {!isCreate && (
                            <>
                                <span className="font-medium text-gray-600">
                                    Created
                                </span>

                                <span className="text-left text-gray-500">
                                    {formatTimestamp(taskData.createdAt)}
                                </span>

                                <span className="font-medium text-gray-600">
                                    Last Updated
                                </span>

                                <span className="text-left text-gray-500">
                                    {formatTimestamp(taskData.updatedAt)}
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
                                    {isSaving ? "Creating task..." : "Create task"}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default TaskDetails;