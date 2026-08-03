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

