import { useAuthStore } from "@/lib/stores/auth";
import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: false,
});

export const apiPrivate = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

apiPrivate.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().user?.token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default api;
