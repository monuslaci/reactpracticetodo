const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5050/api";

const request = async (path) => {
    const response = await fetch(`${API_BASE_URL}${path}`);

    if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(`API request failed (${response.status}): ${responseBody}`);
    }

    return response.json();
};

export const getProjectsData = async () => {
    const [allProjectsResponse] = await Promise.all([
        request("/projects"),

    ]);

    return {
        allProjects: allProjectsResponse.data
    };
};

export const getProjectDetails = async (projectId) => {
    const projectDetailsResponse = await request(`/projects/${projectId}`);

    return {
        projectDetails: projectDetailsResponse.data
    };
};

export const searchProjects = async (searchTerm) => {
    const searchResponse = await request(`/projects/search?q=${encodeURIComponent(searchTerm)}`);

    return {
        allProjects: searchResponse.data
    };
};

export const updateProject = async (projectId, updatedData) => {
    const updateResponse = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
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
        success: updateResponseData.success,
        projectDetails: updateResponseData.data
    };
};

export const createProject = async (newProjectData) => {
    const createResponse = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProjectData)
    });

    if (!createResponse.ok) {
        const responseBody = await createResponse.text();
        throw new Error(`API request failed (${createResponse.status}): ${responseBody}`);
    }

    const createResponseData = await createResponse.json();

    return {
        success: createResponseData.success,
        projectDetails: createResponseData.data
    };
};

export const deleteProject = async (projectId) => {
    const deleteResponse = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
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