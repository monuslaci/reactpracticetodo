const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5050/api";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const responseBody = await response.text();
    throw new Error(`API request failed (${response.status}): ${responseBody}`);
  }

  return response.json();
};

export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || API_BASE_URL.replace(/\/api\/?$/, "");

export const seedMockUsers = async () => {
  const response = await request("/mock/users/seed", { method: "POST" });
  return response.data;
};

export const getUsers = async () => {
  const response = await request("/users");
  return response.data;
};

export const createDirectRoom = async (participantIds) => {
  const response = await request("/rooms/direct", {
    method: "POST",
    body: JSON.stringify({ participantIds })
  });

  return response.data;
};

export const getRoomMessages = async (roomId, userId) => {
  const query = new URLSearchParams({ userId });
  const response = await request(`/rooms/${roomId}/messages?${query.toString()}`);
  return response.data;
};

export const createGroupRoom = async ({
  name,
  participantIds,
  createdBy
}) => {
  const response = await request("/rooms/group", {
    method: "POST",
    body: JSON.stringify({
      name,
      participantIds,
      createdBy
    })
  });

  return response.data;
};

export const getRooms = async (userId) => {
  const query = new URLSearchParams({ userId });
  const response = await request(`/rooms?${query.toString()}`);
  return response.data;
};