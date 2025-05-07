import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import api from "../api";
import type { ILoginSchema, IRegisterSchema } from "../models/auth";
import type { UserModel } from "../models/user";
import { queryClient } from "../providers/react-query/query-client";
import { useAuthStore } from "../stores/auth";

async function register(user: IRegisterSchema) {
	const response = await api.post("/auth/register", user);

	return response.data;
}

export const useRegister = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (user: IRegisterSchema) => register(user),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth"] });
			toast.success("Usuário criado com sucesso", {
				description: "Agora você pode fazer login",
			});
			navigate({ to: "/login" });
		},
		onError: (error: AxiosError) => {
			console.error(error);
			toast.error("Erro ao criar usuário", {
				description: error.response?.data as string,
			});
		},
	});
};

async function teste(user: ILoginSchema) {
	const response = await api.post<{
		user: UserModel;
	}>("/auth/login", user);

	return response.data;
}

export const useLogin = () => {
	const navigate = useNavigate();
	const { login } = useAuthStore();

	return useMutation({
		mutationFn: (user: ILoginSchema) => teste(user),
		onSuccess: (data) => {
			// Primeiro limpar o estado anterior
			localStorage.removeItem("@click-beard:token");
			localStorage.removeItem("@click-beard:user");

			// Depois atualizar com os novos dados
			localStorage.setItem("@click-beard:token", data.user.token);
			login(data.user);

			queryClient.invalidateQueries({ queryKey: ["auth"] });
			toast.success("Login realizado com sucesso");

			// Aguardar um momento para garantir que o estado foi atualizado
			setTimeout(() => {
				if (data.user.role === "ADMIN") {
					navigate({ to: "/admin" });
				} else {
					navigate({ to: "/client" });
				}
			}, 100);
		},
		onError: (error: AxiosError) => {
			console.error(error);
			toast.error("Erro ao fazer login", {
				description: error.response?.data as string,
			});
		},
	});
};
