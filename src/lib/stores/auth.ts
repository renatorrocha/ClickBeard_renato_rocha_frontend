import { create } from "zustand";
import type { UserModel } from "../models/user";

export type AuthState = {
	isAuthenticated: boolean;
	user?: UserModel;
	login: (user: UserModel) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: false,
	user: undefined,

	login: (user) => set({ isAuthenticated: true, user }),

	logout: () => set({ isAuthenticated: false, user: undefined }),
}));
