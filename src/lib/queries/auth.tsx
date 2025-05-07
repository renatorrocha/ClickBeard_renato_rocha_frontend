import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import api from "../api";
import type { IRegisterSchema } from "../models/auth";
import { queryClient } from "../providers/react-query/query-client";

async function register(user: IRegisterSchema) {
	const response = await api.post("/auth/register", user);

	return response.data;
}

export const useRegister = () => {
	return useMutation({
		mutationFn: (user: IRegisterSchema) => register(user),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth"] });
			toast.success("Usuário criado com sucesso");
		},
		onError: (error: AxiosError) => {
			console.error(error);
			toast.error("Erro ao criar usuário", {
				description: error.response?.data as string,
			});
		},
	});
};
