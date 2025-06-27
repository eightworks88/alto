const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiCall = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Erreur inconnue" }));
    throw new Error(error.message || `Erreur ${response.status}`);
  }

  return response.json();
};
