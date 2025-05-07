import { apiPrivate } from "@/lib/api";
import type { ICreateBarberModel } from "@/lib/models/barber";
import { queryClient } from "@/lib/providers/react-query/query-client";
import { useMutation } from "@tanstack/react-query";

async function createBarber(barber: ICreateBarberModel) {
	const response = await apiPrivate.post("/barbers", barber);

	return response.data;
}

export const useCreateBarber = () => {
	return useMutation({
		mutationFn: (barber: ICreateBarberModel) => createBarber(barber),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["barbers"] });
		},
	});
};
