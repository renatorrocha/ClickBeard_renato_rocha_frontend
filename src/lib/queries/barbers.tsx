import { apiPrivate } from "@/lib/api";
import type {
	IBarberModel,
	ICreateBarberModel,
	IUpdateBarberModel,
} from "@/lib/models/barber";
import { queryClient } from "@/lib/providers/react-query/query-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

async function createBarber(barber: ICreateBarberModel) {
	const response = await apiPrivate.post("/barbers", barber);

	return response.data;
}

export const useCreateBarber = () => {
	return useMutation({
		mutationFn: (barber: ICreateBarberModel) => createBarber(barber),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["barbers"] });
			toast.success("Barbeiro criado com sucesso");
		},
		onError: (error: AxiosError) => {
			console.error(error);
			toast.error("Erro ao criar barbeiro", {
				description: error.response?.data as string,
			});
		},
	});
};

async function getBarbers(specialtyId?: string) {
	const response = await apiPrivate.get<IBarberModel[]>("/barbers", {
		params: { specialtyId },
	});

	return response.data ?? [];
}

export const useGetBarbers = (specialtyId?: string, enabled = true) => {
	return useQuery({
		queryKey: ["barbers", specialtyId],
		queryFn: () => getBarbers(specialtyId),
		enabled,
	});
};

async function deleteBarber(barberId: string) {
	const response = await apiPrivate.delete(`/barbers/${barberId}`);

	return response.data;
}

export const useDeleteBarber = () => {
	return useMutation({
		mutationFn: (barberId: string) => deleteBarber(barberId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["barbers"] });
			toast.success("Barbeiro excluído com sucesso");
		},
		onError: (error: AxiosError) => {
			console.error(error);
		},
	});
};

async function updateBarber(barber: IUpdateBarberModel) {
	const response = await apiPrivate.put(`/barbers/${barber.id}`, barber);
	return response.data;
}

export const useUpdateBarber = () => {
	return useMutation({
		mutationFn: (barber: IUpdateBarberModel) => updateBarber(barber),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["barbers"] });
			toast.success("Barbeiro atualizado com sucesso");
		},
		onError: (error: AxiosError) => {
			console.error(error);
			toast.error("Erro ao atualizar barbeiro", {
				description: error.response?.data as string,
			});
		},
	});
};
