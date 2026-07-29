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