import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiPrivate } from "../api";
import type { ICreateAppointment } from "../models/appointment";
import { useAuthStore } from "../stores/auth";

async function getAppointments() {
	const response = await apiPrivate.get("/appointments");
	return response.data;
}

export const useGetAppointments = () => {
	return useQuery({
		queryKey: ["appointments"],
		queryFn: getAppointments,
	});
};

async function cancelAppointment(appointmentId: string) {
	const response = await apiPrivate.delete(`/appointments/${appointmentId}`);
	return response.data;
}

export const useCancelAppointment = () => {
	return useMutation({
		mutationFn: (appointmentId: string) => cancelAppointment(appointmentId),
		onSuccess: () => {
			toast.success("Agendamento cancelado com sucesso");
		},
		onError: () => {
			toast.error("Erro ao cancelar agendamento");
		},
	});
};

async function createAppointment(appointment: ICreateAppointment) {
	const { user } = useAuthStore();
	const response = await apiPrivate.post("/appointments", {
		...appointment,
		clientId: user?.id,
	});
	return response.data;
}

export const useCreateAppointment = () => {
	return useMutation({
		mutationFn: (appointment: ICreateAppointment) =>
			createAppointment(appointment),
		onSuccess: () => {
			toast.success("Agendamento criado com sucesso");
		},
		onError: () => {
			toast.error("Erro ao criar agendamento");
		},
	});
};
