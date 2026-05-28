import { BASE_URL } from "./baseUrl.js";

const TOKEN_KEY = "access_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('user_info');
};

export const logoutUser = async () => {
    const token = getToken();
    try {
        await fetch(`${BASE_URL}auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    } finally {
        clearToken();
    }
};

export const loginUser = async ({ email, password, role }) => {
    const response = await fetch(`${BASE_URL}dispatcher/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password,
            role,
            device_ip: "",
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.detail || "Login failed. Please check your credentials.");
    }

    if (data.access_token) {
        localStorage.setItem(TOKEN_KEY, data.access_token);
    }

    localStorage.setItem('user_info', JSON.stringify({
        name: data.name || data.full_name || data.username || data.email || '',
        role: data.role || role,
    }));

    return data;
};
