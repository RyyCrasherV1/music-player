import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.spotify.com/v1",
    timeout: 5000,
});

// Inject token secara otomatis
axiosInstance.interceptors.request.use(async (config) => {
    const tokenResponse = await fetch("/api/token");
    const { access_token } = await tokenResponse.json();

    config.headers.Authorization = `Bearer ${access_token}`;
    config.headers["Content-Type"] = "application/json";

    return config;
});

export default axiosInstance;
