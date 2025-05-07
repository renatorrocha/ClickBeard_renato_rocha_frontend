import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiPrivate } from "../api";
import type { ICreateAppointment } from "../models/appointment";
import { queryClient } from "../providers/react-query/query-client";

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

async function createAppointment(
	appointment: ICreateAppointment,
	clientId: string,
) {
	const response = await apiPrivate.post("/appointments", {
		...appointment,
		userId: clientId,
	});
	return response.data;
}

export const useCreateAppointment = (clientId: string) => {
	return useMutation({
		mutationFn: (appointment: ICreateAppointment) =>
			createAppointment(appointment, clientId),
		onSuccess: () => {
			toast.success("Agendamento criado com sucesso");
			queryClient.invalidateQueries({ queryKey: ["appointments"] });
		},
		onError: () => {
			toast.error("Erro ao criar agendamento");
		},
	});
};

async function getAppointmentsByClientId(userId: string) {
	const response = await apiPrivate.get(`/appointments/${userId}`);
	return response.data ?? [];
}

export const useGetAppointmentsByClientId = (userId: string) => {
	return useQuery({
		queryKey: ["appointments", userId],
		queryFn: () => getAppointmentsByClientId(userId),
	});
};
