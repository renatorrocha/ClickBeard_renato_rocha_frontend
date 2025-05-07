import { create } from "zustand";
import type { UserModel } from "../models/user";

export type AuthState = {
	isAuthenticated: boolean;
	user?: UserModel;
	login: (user: UserModel) => void;
	logout: () => void;
};

const getStoredUser = (): UserModel | undefined => {
	const storedUser = localStorage.getItem("@click-beard:user");
	return storedUser ? JSON.parse(storedUser) : undefined;
};

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: localStorage.getItem("@click-beard:token") !== null,
	user: getStoredUser(),

	login: (user) => {
		localStorage.setItem("@click-beard:user", JSON.stringify(user));
		set({ isAuthenticated: true, user });
	},

	logout: () => {
		set({ isAuthenticated: false, user: undefined });
		localStorage.removeItem("@click-beard:token");
		localStorage.removeItem("@click-beard:user");
	},
}));
