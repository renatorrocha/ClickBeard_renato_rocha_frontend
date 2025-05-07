import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiPrivate } from "../api";

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
