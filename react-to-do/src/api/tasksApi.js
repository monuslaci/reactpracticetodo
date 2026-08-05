const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5050/api";

const request = async (path) => {
    const response = await fetch(`${API_BASE_URL}${path}`);

    if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(`API request failed (${response.status}): ${responseBody}`);
    }

    return response.json();
};

export const getTasksData = async () => {
    const [allTasksResponse] = await Promise.all([
        request("/tasks"),

    ]);

    return {
        allTasks: allTasksResponse.data
    };
};

export const getTaskDetails = async (taskId) => {
    const taskDetailsResponse = await request(`/tasks/${taskId}`);

    return {
        taskDetails: taskDetailsResponse.data
    };
};


export const searchTasks = async (searchTerm) => {
    const searchResponse = await request(`/tasks/search?q=${encodeURIComponent(searchTerm)}`);

    return {
        allTasks: searchResponse.data
    };
};

export const updateTask = async (taskId, updatedData) => {
    const updateResponse = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    });

    if (!updateResponse.ok) {
        const responseBody = await updateResponse.text();
        throw new Error(`API request failed (${updateResponse.status}): ${responseBody}`);
    }

    const updateResponseData = await updateResponse.json();

    return {
        success: updateResponseData.success
    };
};

export const createTask = async (newTaskData) => {
    const createResponse = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTaskData)
    });

    if (!createResponse.ok) {
        const responseBody = await createResponse.text();
        throw new Error(`API request failed (${createResponse.status}): ${responseBody}`);
    }

    const createResponseData = await createResponse.json();

    return {
        success: createResponseData.success,
        taskDetails: createResponseData.data
    };
};

export const deleteTask = async (taskId) => {
    const deleteResponse = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!deleteResponse.ok) {
        const responseBody = await deleteResponse.text();
        throw new Error(`API request failed (${deleteResponse.status}): ${responseBody}`);
    }

    const deleteResponseData = await deleteResponse.json();

    return {
        success: deleteResponseData.success,
        message: deleteResponseData.message
    };
};